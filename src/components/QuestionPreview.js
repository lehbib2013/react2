import { PeopleOutlineTwoTone } from '@mui/icons-material';
import Chip from '@mui/material/Chip';

import FaceIcon from '@mui/icons-material/Face';
import { useEffect, Fragment } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {connect} from 'react-redux';
import { useLocation,useNavigate, useParams } from "react-router-dom";
import Box, { BoxProps } from '@mui/material/Box';
import { Button } from '@mui/material';
import { handleSaveAnswer } from '../actions/questions';
import Card from '@mui/material/Card';
import { createSvgIcon } from '@mui/material/utils';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';  
import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPreview = (props) => {

const navigate = useNavigate();

const vote = (e) => {
                const {authedUser, qid, option} = e;
                const answer = option;
                props.dispatch(handleSaveAnswer({authedUser, qid,answer}));
                goToHome();
                    }

const goToHome = () => {
                navigate('/');  
                       }
useEffect(() => {
  if (props.nonExistedPath === true) {
    navigate('/notfound');
                 }
                    }, []);

                  
  return (
          <Box  height="100vh" 
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            fontSize: 17,
            gridTemplateRows: '1fr 3fr 5fr 1fr',
            gridTemplateAreas: `"title title"
                                "photo photo"
                                "bodyq bodyq"
                                "option1 option2"`,
          }}>
          <Box sx={{ display: 'flex',alignItems:'center', justifyContent:'center',gridArea: 'title', bgcolor: 'primary.main',border:1 }}>
          <Card sx={{ display: 'flex' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Poll by {props.author}
              </Typography>
         
          <Box sx={{}}> <Button label="Clickable" onClick={goToHome}><HomeIcon /> </Button></Box> 
          </CardContent>
          </Card>
           </Box>
          <Box sx={{ display: 'flex', justifyContent:'center',gridArea: 'photo', bgcolor: 'secondary.main',border:1  }}>
           <Avatar alt="Remy Sharp" src={props.avatar} sx={{  width: 100, height: 100 }} />
         
          </Box>
          <Box sx={{ display: 'flex', justifyContent:'center',gridArea: 'bodyq', bgcolor: 'secondary.main',border:1  }}>
          <Typography gutterBottom variant="h2" component="div">  Would you Rather ? </Typography>
          </Box>
          <Box sx={{ display: 'flex-inline', flexDirection:'column',alignItems:'center', justifyContent:'center',gridArea: 'option1', bgcolor: 'error.main',border:1  }}>{props.optionA} <Badge badgeContent={props.percentageA+'%'} color="primary">
            <MailIcon color="action" />
          </Badge>
          <Box sx={{ bgcolor: 'text.disabled',width:'100px' }}>
          {(!props.votedForA && !props.votedForB)?(<Button onClick={()=>{vote({authedUser:props.currentUser,qid:props.qId, option:'optionOne'})}}>Click</Button>):''} 
            
            </Box>  {props.votedForA?"The current user had voted voted for this option":"" } 
          <Chip icon={<FaceIcon />} label={props.votesForA +' users'} variant="outlined" />
          </Box>
          <Box sx={{ display: 'flex-inline', flexDirection:'column',alignItems:'center',justifyContent:'center',gridArea: 'option2', bgcolor: 'warning.dark',border:1  }}>{props.optionB} 
          <Badge badgeContent={props.percentageB+'%'} color="primary">
            <MailIcon color="action" />
          </Badge>
           <Box sx={{ bgcolor: 'text.disabled',width:'100px' }}>
           {(!props.votedForA && !props.votedForB)?(<Button onClick={()=>{vote({authedUser:props.currentUser,qid:props.qId, option:'optionTwo'})}}>Click</Button>):''} 
            
            </Box> {props.votedForB?"The current user had voted voted for this option":"" } 
           <Chip icon={<FaceIcon />} label={props.votesForB+' users'} variant="outlined" />
           </Box>
         </Box>
         );
}

const mapStateToProps = ({ authentification, users, questions }, props) => {
  let author ;
  let optionA ;
  let optionB ;
  let votedForA ;
  let votedForB ;
  let votesForA ;
  let votesForB ;
  let nbrUsers;
  let percentageA;
  let percentageB ;
  let  nonExistedPath; 
  const { id } = props.router.params;
  let user = users[authentification.authedUser.username];
  let currentQuestion = questions[id];
  console.log(id);
  console.log("currentQuestion");
  console.log(currentQuestion);
  console.log("user ...");
  console.log(user);
    if (currentQuestion == undefined) 
      {nonExistedPath = true; console.log("curremmmmm");
    
    }
  
  else {
    nonExistedPath = false;
 


    //user = users[authentification.authedUser.username];
    author = questions[id].author;
    optionA = questions[id].optionOne.text;
    optionB = questions[id].optionTwo.text;
     votedForA = questions[id].optionOne.votes.includes(authentification.authedUser.username);
     votedForB = questions[id].optionTwo.votes.includes(authentification.authedUser.username);
    votesForA = questions[id].optionOne.votes.length;
    votesForB = questions[id].optionTwo.votes.length;
    nbrUsers =Object.keys(users).length;
    percentageA = (votesForA/nbrUsers)*100;
    percentageB = (votesForB/nbrUsers)*100;
    console.log("voted A...");
    console.log(votedForA);
    console.log("voted B...");
    console.log(votedForB);
    
     
  }
  return {
    currentUser:authentification.authedUser.username,
    author,
    qId:id,
    avatar:user?user.avatarURL:null,
    optionA,
    optionB,
    votedForA,
    votedForB,
    votesForA,
    votesForB,
    percentageA,
    percentageB,
    nonExistedPath,
  };
 
};

export default withRouter(connect(mapStateToProps)(QuestionPreview));
