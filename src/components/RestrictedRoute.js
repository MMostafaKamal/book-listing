import { useContext } from "react";
import { Redirect, Route } from "react-router";
import EditModeContext from "../contexts/EditModeContext";
import routes from "../routes";

export default function RestrictedRoute({ children, ...rest }) {
  const { isActive: isEditModeActive } = useContext(EditModeContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isEditModeActive ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.HOME,
            }}
          />
        )
      }
    />
  );
}
