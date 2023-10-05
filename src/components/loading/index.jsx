import React, { memo } from "react";

import "./loading.css";

function Loading() {
  return (
      <img
        src={require("assets/img/loading_mini.gif")}
        className="d-block img_loading"
        alt="..."
      />
  );
}

export default memo(Loading);
