import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RouteWithLayout from "../lib/RouteWithLayout";
import { MainLayout } from "../layouts";
import { TagsView, SignInView, ProjectsView } from "../views";

function MyComponentDashboard() {
  return (
    <Container maxWidth="sm">
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
    </Container>
  );
}

function MainRouter() {
  const isAuthenticated = true;

  return (
    <Switch>
      <Redirect exact from="/" to="/user/dashboard" />
      <Route path="/sign-in" component={SignInView} />
      <RouteWithLayout
        exact
        path="/user/dashboard"
        authed={isAuthenticated}
        component={MyComponentDashboard}
        layout={MainLayout}
      />
      <RouteWithLayout
        exact
        path="/user/projects"
        authed={isAuthenticated}
        component={ProjectsView}
        layout={MainLayout}
      />
      <RouteWithLayout
        exact
        path="/user/tags"
        authed={isAuthenticated}
        component={TagsView}
        layout={MainLayout}
      />
    </Switch>
  );
}

export default MainRouter;
