import React from "react";
import * as Icons from '@mui/icons-material';

const ComponentWithIcon = ({ iconName }) => {
  const Icon = Icons[iconName];
  return <Icon />;
};

export default ComponentWithIcon;