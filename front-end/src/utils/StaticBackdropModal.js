const StaticBackdropModal = ({ title, body, responseFunction }) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bas-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              {title}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{body}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
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
