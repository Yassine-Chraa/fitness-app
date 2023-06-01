import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { usePost } from '../../context/providers/PostContextProvider';
import PostInput from '../../components/PostTemplate/PostInput';
import PostTemplate from '../../components/PostTemplate';
import Statistics from '../../components/Statistics';
import HomeDivider from '../../components/tinyCompo/HomeDivider';

function Home(): JSX.Element {
  const { currentUser } = useAuth();
  const user = currentUser?.user;
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

  return (
    <Screen name="Fitness App" allowScroll>
      <View style={styles.homeContainer}>

        {user && <View style={{ marginBottom: 20, }}>
          <PostInput currentUserImgUrl={user?.profile} user_id={user?.id} reLoadPosts={loadPosts} />
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
    backgroundColor: theme.colors.background,
  },
});

export default Home;
