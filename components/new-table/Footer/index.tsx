import Summary from './Summary';
import type { DefaultRecordType, StickyOffsets } from '../interface';
import { computed, defineComponent, reactive, toRef } from 'vue';
import { FlattenColumns, useProvideSummary } from '../context/SummaryContext';
import { useInjectTable } from '../context/TableContext';

export interface FooterProps<RecordType = DefaultRecordType> {
  stickyOffsets: StickyOffsets;
  flattenColumns: FlattenColumns<RecordType>;
}

export default defineComponent({
  props: ['stickyOffsets', 'flattenColumns'],
  name: 'Footer',
  setup(props, { slots }) {
    const tableContext = useInjectTable();
    useProvideSummary(
      reactive({
        stickyOffsets: toRef(props, 'stickyOffsets'),
        flattenColumns: toRef(props, 'flattenColumns'),
        scrollColumnIndex: computed(() => {
          const lastColumnIndex = props.flattenColumns.length - 1;
          const scrollColumn = props.flattenColumns[lastColumnIndex];
          return scrollColumn?.scrollbar ? lastColumnIndex : null;
        }),
      }),
    );
    return () => {
      const { prefixCls } = tableContext;
      return <tfoot class={`${prefixCls}-summary`}>{slots.default?.()}</tfoot>;
    };
  },
});

export const FooterComponents = Summary;