import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import IdenticonJs from "identicon.js";
import md5 from "md5";
import { hexToRgbA } from "../core/utils/Functions";

function UserAvatar(props) {
  const { user } = props;
  const hash = md5(user.id + user.name);
  const hashcolor = `#${hash.slice(0, 6)}`;
  const options = {
    foreground: hexToRgbA(hashcolor),
    background: [255, 255, 255, 255],
    margin: 0.2,
    size: 420,
    format: "svg"
  };
  const data = new IdenticonJs(hash, options).toString();
  return <Avatar src={`data:image/svg+xml;base64,${data}`} />;
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserAvatar;
