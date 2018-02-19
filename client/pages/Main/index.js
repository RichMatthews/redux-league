import Main from '../../components/Main';

const mapStateToProps = state => ({
  teams: state.teams
});

const mapDispatchToProps = dispatch => ({
  submitMatch: (home, away) => {
    dispatch(updateWinner(home, away))
    dispatch(updateLoser(home, away))
    dispatch(saveMatchForWinner(home, away))
  },
  updateWinner: (home, away) => {
    dispatch(updateWinner(home, away))
  },
  updateLoser: (home, away) => {
    dispatch(updateLoser(home, away))
  },
  saveMatchForWinner: (home, away) => {
    dispatch(saveMatchForWinner(home, away))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
