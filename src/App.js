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
import Forum from './pages/forum/Forum'; 
import GameLibrary from './pages/gamelibrary/GameLibrary';

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
            )}
          />
          <Route exact path="/feed" render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/liked" render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/posts/create" component={PostCreateForm} />
          <Route exact path="/posts/:id" component={PostPage} />
          <Route exact path="/posts/:id/edit" component={PostEditForm} />
          <Route exact path="/profiles/:id" component={ProfilePage} />
          <Route exact path="/profiles/:id/edit/username" component={UsernameForm} />
          <Route exact path="/profiles/:id/edit/password" component={UserPasswordForm} />
          <Route exact path="/profiles/:id/edit" component={ProfileEditForm} />

          {/* Add the Forum Route */}
          <Route exact path="/forum" component={Forum} />

          {/* Game Library Route */}
          <Route exact path="/game-library" component={GameLibrary} />

          {/* Not Found Route */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
