import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import AuthContext from '../../context/auth-context';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function onPageSwitch(index) {
    if (index == 0) {
        return "/"
    } else if (index == 1) {
        return "/joinEvent"
    } else if (index == 2) {
        return "/createEvent"
    }else if (index== 3){
      return "/mytickets"
    }
}

function SwipeableDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, context) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'Join Event', 'Create Event', 'My Tickets'].map((text, index) =>{ 
           if( text==='Join Event' || text==='Home'){
              return ( <Link className="drawerLink" to={() => onPageSwitch(index)}>
                      <ListItem button key={text}>
                        <ListItemIcon>{index == 0 ? <HomeIcon /> : 
                            index == 1 ? <MailIcon /> : <CreateIcon />
                        }</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                    ) ;      
            }else{
               return (<div>{context.token &&
                        
                          <Link className="drawerLink" to={() => onPageSwitch(index)}>
                            <ListItem button key={text}>
                              <ListItemIcon>{index == 0 ? <HomeIcon /> : 
                              index == 1 ? <MailIcon /> :index == 2 ? <CreateIcon /> : <ListIcon />
                              }</ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItem>
                          </Link>

                        }
                        </div>
                    ) ;    
            }

          
          })}
      </List>
      <Divider />
      
    </div>
  );

  
  return (
     <AuthContext.Consumer>
        
        {(context)=>{
          return (
            <div>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button onClick={toggleDrawer(anchor, true)}>
                      <MenuIcon color="action"></MenuIcon>
                  </Button>
                  <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor, context)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            
           );
        }}
          
     </AuthContext.Consumer>
  );
}

export default SwipeableDrawer