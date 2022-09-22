import "../css/TransactionTable.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TransactionTable = ({ transactions }) => {
  const rows = [
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
    {
      id: 'transaction_id',
      company: 'merchant_name else name',
      date: 'date',
      amount: 'amount',
      status: 'pending'
    },
  ]


  return (
    <div className='table-container'>
      <div className='table-title'>Transactions</div>
      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='tableCell'>Id</TableCell>
              <TableCell className='tableCell'>Company</TableCell>
              <TableCell className='tableCell'>Date</TableCell>
              <TableCell className='tableCell'>Amount</TableCell>
              <TableCell className='tableCell'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell className='tableCell'>{row.id}</TableCell>
                <TableCell className='tableCell'>{row.company}</TableCell>
                <TableCell className='tableCell'>{row.date}</TableCell>
                <TableCell className='tableCell'>{row.amount}</TableCell>
                <TableCell className='tableCell'>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TransactionTable;