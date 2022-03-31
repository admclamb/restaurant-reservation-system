const StaticBackdropModal = ({ title, body, id, responseFunction }) => {
  return (
    <div
      className="modal fade"
      id={id}
      data-bas-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-main"
              onClick={responseFunction}
              data-bs-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticBackdropModal;
