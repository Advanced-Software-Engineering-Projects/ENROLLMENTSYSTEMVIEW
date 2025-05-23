// React Imports
import React, { useState } from "react";
// Material UI Imports
import { Box, ButtonBase, Collapse } from "@mui/material";
// Prop Types Imports
import PropTypes from "prop-types";
// Material Icon Imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
 
const SidebarItem = ({
  icon: Icon,
  name,
  shortName,
  isSidebarCollapsed,
  onClick,
  isActive,
  children = [],
  isChild = false,
}) => {
  const [open, setOpen] = useState(false);
 
  // Combined click handler: if children exist, toggle dropdown; else call onClick.
  const handleClick = (e) => {
    if (children.length > 0) {
      // If there are children, toggle the dropdown.
      setOpen((prev) => !prev);
    } else {
      // Otherwise, execute the provided onClick handler.
      onClick(e);
    }
  };
 
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          width: isSidebarCollapsed ? "60px" : "100%",
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        <ButtonBase
          onClick={handleClick}
          sx={(theme) => ({
            display:
              isSidebarCollapsed && isChild ? "flex" : isSidebarCollapsed ? "column" : "row",
            flexDirection:
              isSidebarCollapsed && isChild ? "column" : isSidebarCollapsed ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxSizing: "border-box",
            WebkitTapHighlightColor: "transparent",
            outline: "none !important",
            border: isActive ? "1px solid rgba(143, 29, 54, 0.18)" : "none",
            margin: "0px",
            cursor: "pointer",
            userSelect: "none",
            verticalAlign: "middle",
            appearance: "none",
            textDecoration: "none",
            width: "100%",
            padding: isSidebarCollapsed ? "8px 0px" : "4px 12px",
            borderRadius: "8px",
            minHeight: "44px",
            textAlign: isSidebarCollapsed ? "left" : "left",
            backgroundColor: isActive
              ? "#094c50" || "transparent"
              : "transparent",
            transition: "background-color 0.3s ease, border 0.3s ease",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:hover": {
              backgroundColor: isActive
                ? null
                : theme.palette.sidebar?.sidebarButtonHoverBg ||
                  "rgba(0,0,0,0.04)",
              outline: "none !important",
              borderColor: "transparent",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
          })}
        >
          <Box
            sx={{
              flexShrink: 0,
              display: "inline-flex",
              width: "24px",
              height: "24px",
              marginBottom: isSidebarCollapsed ? "4px" : "0px",
              marginRight: isSidebarCollapsed ? "0px" : "12px",
              color: "#919EAB",
            }}
          >
            <Icon />
          </Box>
          <Box
            sx={{
              flexDirection: isSidebarCollapsed && isChild ? "column" : "row",
              minWidth: "0px",
              flex: "1 1 auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "block",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: isSidebarCollapsed && isChild ? "normal" : isSidebarCollapsed ? "wrap" : "normal",
                fontWeight: "600",
                fontSize: isSidebarCollapsed ? "0.58rem" : "0.875rem",
                color: "#919EAB",
                textAlign: isSidebarCollapsed ? "center" : "left",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {isSidebarCollapsed
                ? shortName || name // if sidebar is collapsed, use shortName if provided
                : name}
            </Box>
          </Box>
          {children.length > 0 && (
            <Box
              sx={{
                //marginLeft: "auto",
                margin: isSidebarCollapsed ? "0px" : "0px 0px 0px 8px",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandMoreIcon
                fontSize="medium"
                sx={{
                  color: "#FFFFFF",
                }}
              />
            </Box>
          )}
        </ButtonBase>
      </Box>
      {children.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ pl: isSidebarCollapsed ? "0px" : "16px" }}>
            {children.map((child, index) => (
              // Each child is rendered as a SidebarItem.
              <SidebarItem key={index} {...child} isSidebarCollapsed={isSidebarCollapsed} isChild={true} />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};
 
SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.array,
  isChild: PropTypes.bool,
};
 
export default SidebarItem;