import React from "react";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { MovableCardWrapper } from "react-trello/src/styles/Base";
import TagChip from "../../lib/TagChip";


function BoardCard(props) {
  const { onClick, className, title, tags } = props;

  return (
    <MovableCardWrapper onClick={onClick} className={className}>
      <Grid container direction="column" justify="flex-start" spacing={1}>
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Divider />
        <Grid item container direction="row" justify="space-arround" spacing={1}>
          {tags.map(tag => (
            <Grid item key={tag.id}>
              <TagChip tag={tag} style={{ height: "max-content" }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </MovableCardWrapper >
  )
}

BoardCard.propTypes = {
  onClick: propTypes.func.isRequired,
  className: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  tags: propTypes.array.isRequired,
};

export default BoardCard;
