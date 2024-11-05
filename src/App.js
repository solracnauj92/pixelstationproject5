import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import ForumPage from './pages/forum/ForumPage';
import ForumsPage from './pages/forum/ForumsPage';
import ForumDetail from "./pages/forum/ForumDetail";
import CreateForum from './pages/forum/CreateForum';
import ForumThreadPage from './pages/forum/ForumThreadPage';
import Messaging from './pages/messages/Messages';
import GameLibrary from './pages/game_library/GameLibrary';
import GameCollection from './pages/game_library/GameCollection';
import GameDetail from './pages/game_library/GameDetail';
import GameLibraryPage from './pages/game_library/GameLibraryPage';
import Footer from "./components/Footer";
import Newsletter from './pages/newsletter/Newsletter';
import HubList from "./pages/debatehub/HubList";
import HubDetail from "./pages/debatehub/HubDetail";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => (
            <PostsPage message="No results found. Adjust the search keyword." />
          )} />
          <Route exact path="/feed" render={() => (
            <PostsPage
              message="No results found. Adjust the search keyword or follow a user."
              filter={`owner__followed__owner__profile=${profile_id}&`}
            />
          )} />
          <Route exact path="/liked" render={() => (
            <PostsPage
              message="No results found. Adjust the search keyword or like a post."
              filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
            />
          )} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/posts/create" component={PostCreateForm} />
          <Route exact path="/posts/:id" component={PostPage} />
          <Route exact path="/posts/:id/edit" component={PostEditForm} />
          <Route exact path="/profiles/:id" component={ProfilePage} />
          <Route exact path="/profiles/:id/edit/username" component={UsernameForm} />
          <Route exact path="/profiles/:id/edit/password" component={UserPasswordForm} />
          <Route exact path="/profiles/:id/edit" component={ProfileEditForm} />

          {/* Messaging Route */}
          <Route exact path="/messages/:receiverId?" component={Messaging} />

          {/* Forum Routes */}
          <Route exact path="/forum" component={ForumsPage} />
          <Route exact path="/forum/create" component={CreateForum} />
          <Route exact path="/forum/:id" component={ForumPage} />
          <Route exact path="/forum/:forumId/threads" component={ForumThreadPage} />
          <Route path="/forums/:id" component={ForumDetail} />

          {/* Game Library Routes */}
          <Route exact path="/game_library" component={GameLibrary} />
          <Route path="/game_library/games" component={GameCollection} />
          <Route path="/game_library/user-games" component={GameLibraryPage} />
          <Route path="/game_library/games/:gameId" component={GameDetail} />

          <Route path="/newsletter" component={Newsletter} />

          {/* Debate Hub Routes */}
          <Route path="/debatehub/hubs/" exact component={HubList} />
          <Route path="/debatehub/hubs/:hubId/" component={HubDetail} />

          {/* Not Found Route */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
