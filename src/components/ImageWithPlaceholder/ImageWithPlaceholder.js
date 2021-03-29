import { Box, CircularProgress } from "@material-ui/core";
import { useState } from "react";

import PlaceholderImage from "./PlaceholderImage.jpg";

export default function ImageWithPlaceholder({ image, ...props }) {
  const [loading, setLoading] = useState(true);
  const [cantLoad, setCantLoad] = useState();
  return (
    <Box style={props.style} position="relative">
      {loading && (
        <Box position="absolute" left={50} top={50}>
          <CircularProgress />
        </Box>
      )}
      <img
        src={cantLoad ? PlaceholderImage : image}
        onErrorCapture={() => {
          setCantLoad(true);
          setLoading(false);
        }}
        onLoadCapture={() => setLoading(false)}
        {...props}
      />
    </Box>
  );
}
