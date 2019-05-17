import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { empty } from '../../is-empty';
import { connect } from 'react-redux';


const theme = createMuiTheme({
	palette: {
	  type: 'dark', 
	},
	typography: {
		useNextVariants: true,
	  },
});

const styles = {
    root: {
        position: "fixed",
        flexGrow: 1,
        width: "100%",
        zIndex: "999",
        bottom: 0
    },
    linearColorPrimary: {
        backgroundColor: '#1d1e22',
    },
    
};

class Loading extends Component {
    constructor(){
        super();
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
      
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps !== prevState){
            if(!empty(nextProps.Loading)){
                return {loading: nextProps.Loading.Loading}
            }else{
                return { loading: false };
            }
        }else{
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(!empty(this.props.Loading)){
                this.setState({
                    loading: this.props.Loading.Loading
                })
            }else{
                this.setState({
                    loading: false
                })
            }
        }else{
            return null;
        }
    }

    renderloading(classes){
        if(this.state.loading === true){
            return(
                <LinearProgress  classes={{
                        colorPrimary: classes.linearColorPrimary,
                }}/>
            )
        }else{
            return null;
        }
    }

  render() {
    const { classes } = this.props;

    return (			
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                {this.renderloading(classes)}
            </div>
        </MuiThemeProvider>
    )
  }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
    Loading: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    Loading: state.Loading
})

export default connect(mapStateToProps)(withStyles(styles)(Loading));
