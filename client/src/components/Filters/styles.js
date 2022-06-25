import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(7),
    marginTop: '3vh',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formLabel: {
    marginTop: '2vh',
    marginBottom: '6vh',
  },
  formControl: {
    marginTop: '3vh',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginTop: '3vh',
  },
  filterTitle: {
    marginBottom: '4vh',
    position: 'relative',
    left: '35%',
  },
  balance: {
    marginBottom: '2vh',
  },
  mortage: {
    marginTop: '3vh',
  },
  select: {
    height: '3vh',
    width: '8vw',
  },
  creditCards: {
    marginTop: '3vh',
  },
  root: {
    width: '100%',
  },
  thumb: {
    color: '#000',
  },
  rail: {
    color: `rgba(0, 0, 0, 0.26)`,
  },
  track: {
    color: '#000',
  },
}));
