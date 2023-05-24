import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { usePost } from '../../context/providers/PostContextProvider';
import PostInput from '../../components/PostTemplate/PostInput';
import PostTemplate from '../../components/PostTemplate';
import UserType from '../../types/UserType';
import Statistics from '../../components/Statistics';
import HomeDivider from '../../components/tinyCompo/HomeDivider';

function Home(): JSX.Element {
  const { currentUser } = useAuth();
  const [user, setUser] = useState<UserType>(currentUser?.user)
  const [posts, setPosts] = useState<Array<any>>([]);
  const { getPosts } = usePost();
  const { updateState } = useAuth();

  const loadPosts = async () => {
    await updateState();
    const Allposts = await getPosts();
    if (Allposts) {
      setPosts(() => Allposts);
    }
  }

  useEffect(() => {
    loadPosts();
  }, [])

  const reLoadPosts = () => {
    loadPosts();
  }

  useEffect(() => {
    if (currentUser?.user) {
      setUser(() => currentUser?.user);
    }
  }, [])

  return (
    <Screen name="Fitness App" allowScroll>
      <View style={styles.homeContainer}>

        {user && <View style={{ marginBottom: 20, }}>
          <PostInput currentUserImgUrl={user.img_url} user_id={user.id} reLoadPosts={reLoadPosts} />
        </View>}
        <HomeDivider title={"Statistics of today"} />
        {user && <Statistics user={user} />}
        <HomeDivider title={"Posts of today"} />
        {posts && posts.length > 0 && posts.map((post: any) => <PostTemplate post={post} key={post.id} />)}

      </View>
    </Screen>
  );
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginBottom: 30,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '500',
  },
  textMore: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.statusBar,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 24,
    marginBottom: 12,
    paddingVertical: 6,
    marginVertical: 8,
    fontSize: 15
  }
});

export default Home;
