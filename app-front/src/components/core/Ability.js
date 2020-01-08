import { createContext } from "react";
import { Ability, AbilityBuilder } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import { ADMIN, DEVELOPER } from "./constants";

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }
  return item.__type;
}

export const ability = new Ability([], { subjectName });

export function defineRulesFor(role) {
  const { can, rules } = AbilityBuilder.extract();
  if (role === ADMIN) {
    can("create", "Tag");
    can("edit", "Tag");
    can("create", "Project");
    can("edit", "Project");
    can("see", "UsersSettings");
    can("see", "StatusSettings");
  }
  if (role === ADMIN || role === DEVELOPER) {
    can("see", "Tags");
    can("see", "Projects");
    can("use", "AssignTags");
    can("use", "AttachProject");
    can("open/close", "Issue");
    can("edit", "Issue");
    can("edit", "Comment");
    can("delete", "Comment");
  }
  can("see", "Settings");
  can("open/close", "MyIssue");
  can("edit", "MyIssue");
  can("edit", "MyComment");
  can("delete", "MyComment");
  can("see", "Dashboard");
  can("see", "Issue");
  can("see", "Profile");
  return rules;
}
