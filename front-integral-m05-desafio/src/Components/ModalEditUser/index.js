import './styles.css';
import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import FormEditUser from './FormEditUser';
import iconClose from '../../Assets/icon-close.svg';
import ContextModal from '../../Context/contextModal';
import { useContext } from 'react';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(145, 154, 150, 0.30);
  backdrop-filter: blur(4px);
  -webkit-tap-highlight-color: transparent;
`;

const HeaderModal = styled(Box)`
  position: relative;
`;

const modalContainer = {
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    width: 490,
    height: '85vh !important',
    p: 4
};

export default function ModalEditUser() {
  const {openModalEditUser, setOpenModalEditUser} = useContext(ContextModal);
  const handleClose = () => setOpenModalEditUser(false);

  return (
    <StyledModal
      open={openModalEditUser}
      BackdropComponent={Backdrop}
    >
      <HeaderModal sx={modalContainer} className="modal__container">
        <h2 className="modal__title">Edite seu cadastro</h2>
        <img src={iconClose} alt="fechar modal" className="modal__btnClose" onClick={handleClose} />
        <FormEditUser />
      </HeaderModal>
    </StyledModal>
  );
}
