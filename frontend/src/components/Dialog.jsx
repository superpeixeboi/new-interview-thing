import React from "react";
import __ from "../i18n";

function Dialog (props) {
  return (
    <dialog id={props.id} className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{props.title}</h3>
        {props.message && <p className="py-4">{props.message}</p>}
        <div className="modal-action">
          {props.children || <button className="btn btn-primary" onClose={props.onClose}>{__('Ok')}</button>}
        </div>
      </form>
    </dialog>
  )
}

function ErrorDialog (props) {
  const { error } = props
  const getMessage = () => {
    if (error && error.code === 'ERR_BAD_REQUEST') {
      return (
        <ul className="py-4">
          {Object.entries(error.response.data.errors).map(([ fieldName, { message }], idx) => (
            <li key={`error-${idx}`}>{__(fieldName)}: {__(message)}</li>
          ))}
        </ul>
      )
    }
    return <p>{__('Ação falhou')}</p>
  }
  return (
    <dialog id={props.id} className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{props.title}</h3>
        {getMessage()}
        <div className="modal-action">
          {props.children || <button className="btn btn-primary" onClose={props.onClose}>{__('Ok')}</button>}
        </div>
      </form>
    </dialog>
  )
}

export {
  Dialog,
  ErrorDialog
}
