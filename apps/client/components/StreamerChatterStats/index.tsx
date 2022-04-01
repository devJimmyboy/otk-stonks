import React from 'react'
import { Chatter, Streamer } from '../../types'
import { Column, useTable } from 'react-table'
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'
import useSWR from 'swr'
interface ChatterFormatted {
  last: number
  time: number
  login: string
  present: number
  streams: number[]
  roles: string
}
interface Props {
  chatter: string
  streamer: Streamer
}
const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function StreamerChatterStats({ streamer, chatter }: Props) {
  const channel = streamer.login
  const [rowsState, setRowsState] = React.useState<{ page: number; pageSize: number }>({ page: 0, pageSize: 50 })
  const [sortModel, setSortModel] = React.useState<GridSortModel>([{ field: 'time', sort: 'desc' }])
  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel)
  }

  const { data: chatters, isValidating } = useSWR<{ chatters: Chatter[]; currentPage: number; totalPages: number }>(
    () =>
      chatter && chatter.length > 0
        ? `/chatters/${chatter}`
        : `/chatters?limit=${rowsState.pageSize}&page=${rowsState.page + 1}&channel=${channel}&sort=${sortModel[0].field}&order=${sortModel[0].sort}`,
    fetcher
  )

  const rowCount = chatters?.totalPages * 50
  const [rowCountState, setRowCountState] = React.useState(rowCount || 0)
  const data =
    chatters?.chatters.map((chatter, i) =>
      chatter
        ? ({
            id: i,
            last: chatter.last[channel],
            time: chatter.time[channel],
            login: chatter.login,
            present: chatter.present[channel],
            streams: chatter.streams[channel],
            roles: chatter.roles[channel],
          } as ChatterFormatted)
        : {
            id: i,
          }
    ) || []
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        headerName: 'Name',
        field: 'login', // field is the "key" in the data
        flex: 1,
      },
      {
        headerName: 'Role',
        field: 'roles', // field is the "key" in the data
        flex: 1,
      },
      {
        headerName: 'Streams Attended',
        field: 'present',
        flex: 1,
      },
      {
        headerName: 'Minutes Watching',
        field: 'time',
        flex: 1,
      },
    ],
    []
  )

  React.useEffect(() => {
    setRowCountState((prevRowCountState) => (!isValidating && chatters !== undefined ? rowCount : prevRowCountState))
  }, [chatters, setRowCountState])
  React.useEffect(() => {}, [chatters])

  return (
    <div className="px-8" style={{ height: 800, width: '100%' }}>
      <DataGrid
        className="shadow-xl"
        rows={data}
        columns={columns}
        rowCount={rowCountState}
        loading={isValidating}
        rowsPerPageOptions={[50]}
        paginationMode="server"
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        pagination
        {...rowsState}
        localeText={{ noRowsLabel: 'No streams in the database.' }}
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
        onPageSizeChange={(pageSize) => setRowsState((prev) => ({ ...prev, pageSize }))}
        disableColumnFilter
      />
    </div>
  )
}
