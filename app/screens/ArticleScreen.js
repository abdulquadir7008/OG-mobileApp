import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const is7InchTablet = width >= 600 && width <= 800 && height >= 800 && height <= 1200;


const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/load.gif')} style={{ height: 60, width: 60 }} />
        </View>
    );
};
const ScrollLoader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/Ellipsis.gif')} style={{ height: 60, width: 60 }} />
        </View>
    );
};
const ArticleScreen = () => {
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const site = "https://opengovasia.com";
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const route = useRoute();
    const { countryId } = route.params || {};
    // console.log(countryId);
    useEffect(() => {
        fetchCategories();
        setPosts([]);
        fetchData(1, selectedCategoryId); // Fetch data with initial category as null
    }, [selectedCategoryId]);


    const fetchCategories = async () => {
        try {
            const response = await fetch(`https://opengovasiatest.com/wp-json/wp/v2/categories?parent=1143&_embed&per_page=20`);
            const data = await response.json();

            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async (page, categoryId = null) => {
        setIsFetching(true);
        try {
            let apiUrl = `https://opengovasia.com/wp-json/wp/v2/posts/?page=${page}&_embed&per_page=10`;
            
            if (categoryId) {
                apiUrl += `&categories=${categoryId}`;
            }
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.length === 0) {
                setHasMorePages(false);
            }
            setPosts((prevPosts) => [...prevPosts, ...data]);
            setIsFetching(false);
        } catch (error) {
            console.error(error);
            setIsFetching(false);
        }
    };


    const handleCategoryPress = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };


    const handleScroll = (post) => {
        const { layoutMeasurement, contentOffset, contentSize } = post.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
        if (isEndReached && !isFetching && hasMorePages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchData(nextPage);
        }
    };
    const firstPost = posts[0];
    const secondPost = posts[1];
    const thirdPost = posts[2];
    const navigation = useNavigation();
    const handlePostPress = (postId) => {
        navigation.navigate('Review', { postId });
    };
    if (isFetching && currentPage === 1) {
        // If still fetching the initial data, show Loader
        return <Loader />;
    }
    const handleAllPress = () => {
        setSelectedCategoryId(null); // Reset the selected category to null
        // Reset posts and fetch all data
        setPosts([]);
        fetchData(1);
    };
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoriesContainer}>
                    <TouchableHighlight
                        style={[styles.categoryButton, selectedCategoryId === null && styles.selectedCategoryButton]}
                        onPress={handleAllPress}
                        underlayColor="#DDD"
                    >
                        <Text style={styles.categoryButtonText}>All</Text>
                    </TouchableHighlight>
                    {categories
                        .filter((category) =>
                            category.id !== 1158 &&
                            category.id !== 1151 &&
                            category.id !== 1144 &&
                            category.id !== 1152 &&
                            category.id !== 31 &&
                            category.id !== 1146 &&
                            category.id !== 1150 &&
                            category.id !== 13 &&
                            category.id !== 34
                        )
                    .map((category) => (
                        <TouchableHighlight
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategoryId === category.id && styles.selectedCategoryButton,
                            ]}
                            onPress={() => handleCategoryPress(category.id)}
                            underlayColor="#DDD"
                        >
                            <Text style={[styles.categoryButtonText, selectedCategoryId === category.id && styles.selectedCategoryText]}>{category.name}</Text>
                        </TouchableHighlight>
                    ))}
                </View>
            </ScrollView>
            <ScrollView horizontal={false} scrollEventThrottle={400} // Adjust the threshold as needed
                onScroll={handleScroll}>


                <View style={styles.viewContent}>

                    {categories
                        .filter((categoryRow) =>
                            categoryRow.id === selectedCategoryId
                        )
                        .map((categoryRow) => (
                            <View key={categoryRow.id}>
                                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 17, fontWeight: 'bold' }}>{categoryRow.name}</Text>
                            </View>
                        ))}

                    {firstPost && (
                        <TouchableHighlight style={styles.imageWrapper} onPress={() => handlePostPress(firstPost.id)} underlayColor="#DDD">
                            <View key={firstPost.id}>
                                <View style={styles.overLap}></View>
                                {firstPost._embedded['wp:featuredmedia'][0]?.source_url ? (
                                    <Image style={styles.imageRap} source={{ uri: site + firstPost._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }} />
                                ) : (
                                    <Image style={styles.imageRap} />
                                )}


                                <Text style={styles.eventTitle}>{firstPost.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}</Text>
                                <View style={styles.eventTimestamp}>
                                    <Text style={styles.eventDate}>{firstPost._embedded.author[0].name}</Text>
                                    <Text style={styles.eventTime}>{new Date(firstPost.date).toDateString()}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                    {/* Second Post*/}
                    <View style={styles.twoListPost}>
                        {secondPost && (
                            <TouchableHighlight style={styles.secondPost} onPress={() => handlePostPress(secondPost.id)} underlayColor="#DDD">
                                <View key={secondPost.id}>
                                    <View style={styles.overLap}></View>

                                    {secondPost._embedded['wp:featuredmedia'][0]?.source_url ? (
                                        <Image
                                            style={styles.secondImage}
                                            source={{
                                                uri: site + secondPost._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url
                                            }}
                                        />
                                    ) : (
                                        <Image style={styles.secondImage} />
                                    )}

                                    <Text style={styles.secondPostTitle}>{secondPost.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}</Text>
                                    <View style={styles.secondPostTimeStamp}>
                                        <Text style={styles.secondPostDate}>{secondPost._embedded.author[0].name}</Text>
                                    </View>
                                    <View style={styles.secondPostTimeStampTwo}>
                                        <Text style={styles.secondPostTime}>{new Date(secondPost.date).toDateString()}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}

                        {thirdPost && (
                            <TouchableHighlight style={styles.secondPost} onPress={() => handlePostPress(thirdPost.id)} underlayColor="#DDD">
                                <View key={thirdPost.id}>
                                    <View style={styles.overLap}></View>
                                    {thirdPost._embedded['wp:featuredmedia'][0]?.source_url ? (
                                        <Image style={styles.secondImage} source={{ uri: site + thirdPost._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }} />
                                    ) : (
                                        <Image style={styles.secondImage} />
                                    )}

                                    <Text style={styles.secondPostTitle}>{thirdPost.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}</Text>
                                    <View style={styles.secondPostTimeStamp}>
                                        <Text style={styles.secondPostDate}>{thirdPost._embedded.author[0].name}</Text>
                                    </View>
                                    <View style={styles.secondPostTimeStampTwo}>
                                        <Text style={styles.secondPostTime}>{new Date(thirdPost.date).toDateString()}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}

                    </View>
                    {posts
                        .filter((post) => post !== firstPost && post !== secondPost && post !== thirdPost)
                        .map((post, index) => ( // Add index as the second part of the key

                            <TouchableHighlight
                                onPress={() => handlePostPress(post.id)}
                                underlayColor="#DDD" key={`${post.id}-${index}`}>
                                <View style={styles.eventlistDetails}>
                                    <View style={styles.eventList}>
                                        {/* <Text>{event.id}</Text> */}
                                        {post._embedded['wp:featuredmedia'][0]?.source_url ? (
                                            <Image
                                                style={styles.eventListImage}
                                                source={{ uri: site + post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }}
                                            />
                                        ) : (
                                            <Image style={styles.eventListImage} />
                                        )}

                                        <View style={styles.eventContentDetails}>
                                            <Text style={styles.eventListTitle}>{post.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}</Text>
                                            <Text style={styles.eventListDate}>{post._embedded.author[0].name}</Text>
                                            <Text style={styles.eventListTime}>{new Date(post.date).toDateString()}</Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableHighlight>

                        ))}

                    {/* <TouchableHighlight
                    style={styles.loadMoreButton}
                    onPress={loadMoreData}
                    underlayColor="#DDD"
                >
                    <Text style={styles.loadMoreText}>Load More</Text>
                </TouchableHighlight>   */}
                    {isFetching && (
                        <View style={styles.loaderContainer}>
                            <ScrollLoader />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>

    );
}

export default ArticleScreen;
let MIN_HEIGHT;

if (is7InchTablet) {
    MIN_HEIGHT = 400; // Value for 7-inch tablet
} else {
    MIN_HEIGHT = 250; // Value for other screens
}

const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
const styles = StyleSheet.create({
    viewContent: {
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    overLap: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        zIndex: 1,
        borderRadius: 8
    },
    imageWrapper: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 20

    },
    secondPost: {
        backgroundColor: '#fff',
        padding: 10,
        flex: 1
    },
    twoListPost: {
        flexDirection: 'row',
        width: '100%',
    },
    loadMoreButton: {
        backgroundColor: '#fff',
        borderColor: '#dbdbdb',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    loadMoreText: {
        fontSize: 16,
        color: '#363434',
        fontWeight: 'bold',
    },
    imageRap: {
        width: '100%',
        height: MIN_HEIGHT,
        borderRadius: 8
    },
    secondImage: {
        height: 150,
        borderRadius: 8
    },
    headingTittle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 20,
        fontFamily: font,
        marginLeft: 10
    },
    eventTitle: {
        fontSize: 25,
        fontWeight: '500',
        fontFamily: font,
        color: '#fff',
        lineHeight: 30,
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 10,
        padding: 20,
        bottom: '20%'
    },
    secondPostTitle: {
        fontSize: 16,
        fontFamily: font,
        color: '#fff',
        lineHeight: 22,
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 10,
        padding: 10,
        top: '2%'
    },
    eventTimestamp: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 10,
        color: '#fff',
        padding: 20,
        bottom: '5%',
        fontWeight: 'bold',
    },
    secondPostTimeStamp: {
        position: 'absolute',
        zIndex: 10,
        color: '#fff',
        padding: 5,
        bottom: '15%',
        fontWeight: 'bold',
        paddingLeft: 10
    },
    secondPostTimeStampTwo: {
        position: 'absolute',
        zIndex: 10,
        color: '#fff',
        padding: 10,
        bottom: '0%',
        fontWeight: 'bold'
    },
    eventDate: {
        textAlign: 'left',
        flex: 1,
        color: '#fff'
    },
    secondPostTime: {
        color: '#fff',
        fontSize: 10
    },
    secondPostDate: {
        color: '#fff',
        fontSize: 13
    },
    eventTime: {
        textAlign: 'right',
        justifyContent: 'flex-end',
        flex: 1,
        color: '#fff'
    },
    eventList: {
        display: 'flex',
        flexDirection: 'row',
    },
    eventListImage: {
        height: MIN_HEIGHT / 3,
        width: '40%',
        margin: 5,
        borderRadius: 8
    },
    eventContentDetails: {
        width: '60%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    eventListTitle: {
        marginBottom: 5,
        fontSize: 15,
        paddingTop: 5
    },
    eventListDate: {
        fontWeight: 'bold'
    },
    eventListTime: {
        fontSize: 10

    },
    eventlistDetails: {
        borderRadius: 8,
        elevation: 4, // Adjust the elevation for the desired shadow effect
        shadowColor: '#bbbbbb',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        padding: 15,
        marginLeft: 10,
        marginRight: 10
    },

    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',

    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
    },
    categoryButtonText: {
        fontWeight: 'normal',
        fontSize: 16
    },
    selectedCategoryButton: {
        borderBottomColor: '#0b4596',
        borderBottomWidth: 2,
        fontWeight: 'bold',

    },
    selectedCategoryText: {
        fontWeight: 'bold',
        color: '#0b4696'
    },

});
