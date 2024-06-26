import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import boardApi from "../../api/boardApi";
import assets from "../../assets/index";
import "../../css/custom-scrollbar.css";
import { setBoards } from "../../redux/features/boardSlice";
import FavouriteList from "./FavouriteList";

const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditUserClicked, setIsEditUserClicked] = useState(false);

  const sidebarWidth = 250;

useEffect(() => {
  // This hook might attempt to navigate to the boards page, but only if we're not already looking at boards, users, or login
  if (!isEditUserClicked && !location.pathname.includes('/boards') && !location.pathname.includes('/users') && !location.pathname.includes('/login')) {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll();
        dispatch(setBoards(res));
        if (boards.length > 0 && !location.pathname.includes('/boards')) {
          navigate(`/boards/${boards[0].id}`);
        }
      } catch (err) {
        alert(err);
      }
    };
    getBoards();
  }
}, [dispatch, isEditUserClicked, location.pathname, navigate, boards.length]);

useEffect(() => {
  // Direct navigation to "/users" occurs only if the user clicks to edit and we're not already on a users-related path
  if (isEditUserClicked) {
    navigate("/users");
  }
}, [isEditUserClicked, location.pathname, navigate]);


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onDragEnd = async ({ source, destination }) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setBoards(newList));

    try {
      await boardApi.updatePositoin({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  const addBoard = async () => {
    try {
      const res = await boardApi.create();
      const newList = [res, ...boards];
      dispatch(setBoards(newList));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100vh",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }} />
        <FavouriteList />
        <Box sx={{ paddingTop: "10px" }} />
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              Kanban-Boards
            </Typography>
            {/* <!-- Sieht nur der Projektmanager (und Admin), damit nur dieser neue Boards erstellen kann */}
            { (user.role === "Projektmanager" || user.role === "Administrator") && (
            <IconButton onClick={addBoard}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
            )}
          </Box>
        </ListItem>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={"list-board-droppable-key"}
            droppableId={"list-board-droppable"}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl: "20px",
                          cursor: snapshot.isDragging
                            ? "grab"
                            : "pointer!important",
                        }
                      }
                      onClick={() => setIsEditUserClicked(false)}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* <!-- Sieht nur der Admin, damit er Rollen verändern kann */}
        {user.role === "Administrator" && (
          <ListItem>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                <Button
                  onClick={() => setIsEditUserClicked(true)}
                  sx={{
                    background: "none",
                    border: "none",
                    padding: "0",
                    font: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Edit Users
                </Button>
              </Typography>
            </Box>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
