import { makeStyles } from '@mui/styles';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { Avatar, Box, Tooltip } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { CallAssignmentCaller } from '../apiTypes';
import TagChip from 'features/tags/components/TagManager/components/TagChip';
import { ZetkinTag } from 'utils/types/zetkin';
import ZUIResponsiveContainer from 'zui/ZUIResponsiveContainer';

const useStyles = makeStyles((theme) => ({
  chip: {
    borderColor: theme.palette.grey[500],
    borderRadius: '1em',
    borderWidth: '1px',
    color: theme.palette.text.secondary,
    cursor: 'default',
    display: 'flex',
    lineHeight: 'normal',
    marginRight: '0.1em',
    overflow: 'hidden',
    padding: '0.2em 0.7em',
    textOverflow: 'ellipsis',
  },
}));

const TagsCell = ({ tags }: { tags: ZetkinTag[] }) => {
  const classes = useStyles();

  return (
    <ZUIResponsiveContainer ssrWidth={200}>
      {(width) => {
        const maxTags = Math.floor(width / 100);
        const displayedTags = tags.slice(0, maxTags);
        const hiddenTags = tags.slice(maxTags);

        const tooltipTitle = hiddenTags.map((tag) => tag.title).join(', ');

        return (
          <Box alignItems="center" display="flex" width="100%">
            {displayedTags.map((tag) => (
              <TagChip key={tag.id} tag={tag} />
            ))}
            {hiddenTags.length > 0 && (
              <Tooltip title={tooltipTitle}>
                <Box border={2} className={classes.chip}>
                  {`${displayedTags.length > 0 ? '+' : ''}${hiddenTags.length}`}
                </Box>
              </Tooltip>
            )}
          </Box>
        );
      }}
    </ZUIResponsiveContainer>
  );
};

const CallAssignmentCallersList = ({
  callers,
}: {
  callers: CallAssignmentCaller[];
}) => {
  const intl = useIntl();
  const { orgId } = useRouter().query;

  const columns: GridColDef<CallAssignmentCaller>[] = [
    {
      disableColumnMenu: true,
      field: 'id',
      headerName: ' ',
      renderCell: (params) => (
        <Avatar src={`/api/orgs/${orgId}/people/${params.id}/avatar`} />
      ),
      sortable: false,
    },
    {
      field: 'name',
      flex: 1,
      headerName: intl.formatMessage({
        id: 'pages.organizeCallAssignment.callers.nameColumn',
      }),
      valueGetter: (params) =>
        `${params.row.first_name} ${params.row.last_name}`,
    },
    {
      field: 'prioritized_tags',
      flex: 1,
      headerName: intl.formatMessage({
        id: 'pages.organizeCallAssignment.callers.prioritizedTagsColumn',
      }),
      renderCell: (props) => {
        return <TagsCell tags={props.row.prioritized_tags} />;
      },
      sortable: false,
    },
    {
      field: 'excluded_tags',
      flex: 1,
      headerName: intl.formatMessage({
        id: 'pages.organizeCallAssignment.callers.excludedTagsColumn',
      }),
      renderCell: (props) => {
        return <TagsCell tags={props.row.excluded_tags} />;
      },
      sortable: false,
    },
  ];

  return (
    <DataGridPro
      autoHeight
      columns={columns}
      disableColumnFilter
      disableColumnMenu
      disableColumnReorder
      disableColumnResize
      hideFooter
      rows={callers}
      style={{
        border: 'none',
      }}
    />
  );
};

export default CallAssignmentCallersList;
