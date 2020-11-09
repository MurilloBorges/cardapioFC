import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconSVG from './IconSVG';

export default function Modal({
  header,
  footer,
  textTitle,
  btnSuccess,
  btnDanger,
  btnInfo,
  btnOpen,
  showModal,
  textOpen,
  classNameButton,
  componentesBody,
  id,
  handleSubmit,
  handleSubmitOpen,
  icone,
  btnSuccessTexto,
}) {
  const [show, setShow] = useState(showModal);

  const handleClose = (() => {
    setShow(false);
    document.getElementById(id).classList.remove('modal--checked');
  });

  const handleInfo = (() => {
    handleSubmit();
    handleClose();
  });

  const handleShow = (() => {
    handleSubmitOpen();
    setShow(true);
  });

  return (
    <>
      {btnOpen && (
        <button type="button" className={`${classNameButton}`} onClick={handleShow}>
          {textOpen}
          {icone}
        </button>
      )}
      <div id={id} className={`modal ${show && 'modal--checked'}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {header && (
              <div className="modal-header">
                <div className="modal-title"><h2>{textTitle}</h2></div>
                <span aria-hidden="true" className="modal-close" onClick={handleClose}>
                  <IconSVG
                    icon="close"
                    height="3rem"
                    width="3rem"
                    fill="#ffffff"
                  />
                </span>
              </div>
            )}
            <div className="modal-body">
              {componentesBody}
            </div>
            {footer && (
              <div className="modal-footer">
                {btnSuccess && <button type="button" data-cy="button-success" className="btn btn-success" onClick={handleInfo}>{btnSuccessTexto}</button>}
                {btnInfo && <button type="button" data-cy="button-ok" className="btn btn-info" onClick={handleInfo}>OK</button>}
                {btnDanger && <button type="button" data-cy="button-danger" className="btn btn-danger" onClick={handleClose}>Close</button>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  header: PropTypes.bool,
  footer: PropTypes.bool,
  textTitle: PropTypes.string,
  btnSuccess: PropTypes.bool,
  btnDanger: PropTypes.bool,
  btnInfo: PropTypes.bool,
  btnOpen: PropTypes.bool,
  showModal: PropTypes.bool,
  textOpen: PropTypes.string,
  classNameButton: PropTypes.string,
  componentesBody: PropTypes.element.isRequired,
  id: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleSubmitOpen: PropTypes.func,
  icone: PropTypes.element,
  btnSuccessTexto: PropTypes.string,
};

Modal.defaultProps = {
  header: false,
  footer: false,
  textTitle: '',
  btnSuccess: false,
  btnDanger: false,
  btnInfo: false,
  btnOpen: false,
  showModal: false,
  textOpen: '',
  classNameButton: '',
  id: 'modal-component',
  handleSubmit: () => { },
  handleSubmitOpen: () => { },
  icone: <></>,
  btnSuccessTexto: 'Salvar',
};
