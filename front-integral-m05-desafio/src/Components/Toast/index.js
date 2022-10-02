import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function Toast() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity={open} sx={open === "success" ? { bgcolor: '#C3D4FE', color: '#243F80', width: '100%', fontSize: '20px' } : { bgcolor: '#F2D6D0', color: '#AE1100', width: '100%', fontSize: '20px' }}>
        {open === "success" ? "Cobrança excluida com sucesso" : "Cobrança não esta pendente"}
      </Alert>
    </Snackbar>
  )
}

export default Toast;