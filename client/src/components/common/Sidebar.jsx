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
import { Link, useNavigate, useParams, useHistory } from "react-router-dom";
import boardApi from "../../api/boardApi";
import assets from "../../assets/index";
import "../../css/custom-scrollbar.css";
import { setBoards } from "../../redux/features/boardSlice";
import FavouriteList from "./FavouriteList";

const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();

  const sidebarWidth = 250;

  /* useEffect(() => {
    console.log("EditUser:", isEditUserClicked)
    if (isEditUserClicked == false) {
      const getBoards = async () => {
        try {
          const res = await boardApi.getAll();
          dispatch(setBoards(res));
        } catch (err) {
          alert(err);
        }
      };
      getBoards();
      const activeItem = boards.findIndex((e) => e.id === boardId);
      if (boards.length > 0 && boardId === undefined) {
        navigate(`/boards/${boards[0].id}`);
      }
      setActiveIndex(activeItem);
    } if (isEditUserClicked == true) {
      navigate("/users");
    } 
  }, [boards, boardId, navigate, dispatch]); */

  useEffect(() => {
    console.log("EditUser:", isEditUserClicked);

    if (isEditUserClicked === false) {
      const getBoards = async () => {
        try {
          const res = await boardApi.getAll();
          // Only update if boards are different (consider deep equality check here)
          dispatch(setBoards(res));
        } catch (err) {
          alert(err);
        }
      };
      getBoards();
    }
}, [dispatch, isEditUserClicked]); // Removed `boards` from dependencies to avoid loop

useEffect(() => {
    // Logic that depends on `boards` and `boardId`, but does not update `boards`
    if (!isEditUserClicked) {
      const activeItem = boards.findIndex((e) => e.id === boardId);
      if (boards.length > 0 && boardId === undefined) {
        navigate(`/boards/${boards[0].id}`);
      }
      setActiveIndex(activeItem);
    }
}, [boards, boardId, navigate, isEditUserClicked]); // This effect runs for board changes

useEffect(() => {
    if (isEditUserClicked) {
      navigate("/users");
    }
}, [isEditUserClicked, navigate]); // Separated effect for isEditUserClicked


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

  const editUsers = async () => {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include', // This is required to send the cookie.
    });
    const data = await response.json();
    const newToken = data.token;
    localStorage.setItem('token', newToken);
    navigate("/users");
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
