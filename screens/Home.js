import React,{useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";

import { Entypo } from '@expo/vector-icons';
import firebase from "firebase";
import * as Facebook from 'expo-facebook';
import "firebase/auth";
import { retrieveAUser, saveAUser } from '../utils/firebaseHelper';
import { Zocial } from '@expo/vector-icons';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

import { icons, images, SIZES, COLORS, FONTS } from '../constants'


const Home = ({ navigation }) => {

    // Data ng Restaurants

    const initialCurrentLocation = {
        streetName: "Philippines",
        gps: {
            latitude: 12.8797,
            longitude: 121.7740
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Jollibee",
            icon: icons.jolly,
        },
        {
            id: 2,
            name: "McDonalds",
            icon: icons.mcdo,
        },
        {
            id: 3,
            name: "Mcollibee",
            icon: icons.mcdojolly,
        },
        {
            id: 4,
            name: "Mang Inasal",
            icon: icons.manginasal,
        },
        {
            id: 5,
            name: "Burger King",
            icon: icons.burgerking,
        },
        {
            id: 6,
            name: "Zagu",
            icon: icons.zagu,
        },

    ]

    // Prices
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "By Jollibee Chickenjoy",
            rating: 4.8,
            categories: [1],
            priceRating: affordable,
            photo: images.chicken_jolly,
            duration: "30 - 45 min",
            location: {
                latitude: 15.470333911284676,
                longitude: 120.95591349960823,
            },
            courier: {
                avatar: images.avatar_5,
                name: "Ronuel"
            },
            menu: [
                {
                    menuId: 1,
                    name: "8 - pc. Chickenjoy Solo",
                    photo: images.chicken_jolly,
                    description: "Eight-piece bucket of the Philippines' best-tasting crispylicious, juicylicious Chickenjoy that is crispy on the outside, tender and juicy on the inside.",
                    calories: 200,
                    price: 549.00
                },
              
            ]
        },
        {
            id: 2,
            name: "By McDonalds",
            rating: 4.8,
            categories: [2],
            priceRating: expensive,
            photo: images.mcdo_party,
            duration: "15 - 20 min",
            location: {
                latitude: 15.492437508511113,  
                longitude: 120.97543793487293,
            },
            courier: {
                avatar: images.avatar_2,
                name: "Mark"
            },
            menu: [
                {
                    menuId: 2,
                    name: "McDo Party Box",
                    photo: images.mcdo_party,
                    description: "Comes with 10-pc. Original Chicken Mcdo, 40-pc. Chicken McNuggets, 4 BFF Fries, 10 Regular Coke, 10 Rice. Party Box includes: 10 Party Hats, 10 Activity Tray Mats, 10 Party Balloons and 1 Gift for the Celebrant",
                    calories: 250,
                    price: 2999
                },
                
            ]
        },
        {
            id: 3,
            name: "By Mcollibee",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: images.mcdo_spag,
            duration: "20 - 25 min",
            location: {
                latitude: 15.483313097082933,
                longitude: 120.96421521222062,
            },
            courier: {
                avatar: images.avatar_3,
                name: "Marvie"
            },
            menu: [
                {
                    menuId: 3,
                    name: "Mcollibee Spaghetti",
                    photo: images.mcdo_spag,
                    description: "Your meatiest, cheesiest and sweet-sarap Mcollibee Spaghetti Family Plan paired with the classic favorite Palabok Family Plan!",
                    calories: 100,
                    price: 199
                }
            ]
        },
        {
            id: 4,
            name: "By Mang Inasal",
            rating: 4.8,
            categories: [4],
            priceRating: expensive,
            photo: images.manginasal_paa,
            duration: "10 - 15 min",
            location: {
                latitude: 15.485246776712403, 
                longitude: 120.969638539207,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Gerald"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Paa Large",
                    photo: images.manginasal_paa,
                    description: "Enjoy the grilled goodness of our 2pcs-in-1 Chicken Inasal Paa and the savoury meaty flavour of our Palabok. It comes with rice and Sinigang soup. +All rice meals come with a cup of rice, and an option to have unlimited servings of rice.",
                    calories: 100,
                    price: 132
                }
            ]
        },
        {
            id: 5,
            name: "By Burger King",
            rating: 4.8,
            categories: [5],
            priceRating: affordable,
            photo: images.burger_bogo,
            duration: "15 - 20 min",
            location: {
                latitude: 15.467124636563153,
                longitude: 120.95550764105595,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Bradley"
            },
            menu: [
                {
                    menuId: 5,
                    name: "BOGO + $1",
                    photo: images.burger_bogo,
                    description: "Burger King's BOGO + 1 menu includes the following options: Whopper. 9-piece Chicken Fries. Original Chicken Sandwich.",
                    calories: 1087-1319,
                    price: 199
                },

            ]
        },
        {
            id: 6,
            name: "By Zagu",
            rating: 4.9,
            categories: [6],
            priceRating: affordable,
            photo: images.zagu_shake,
            duration: "35 - 40 min",
            location: {
                latitude: 15.460783904191949, 
                longitude: 120.94885598338463,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Miss Jay"
            },
            menu: [
                {
                    menuId: 6,
                    name: "Zagu Shake",
                    photo: images.zagu_shake,
                    description: "Pinoy Desserts: Buko Pandan, Ube, Quezo Royale   Zagu Delights: Strawberry, Watermelon, Melon, Pearl Milk Tea, Cafe Latte, Taro, Hazelnut Cappuccino, Black Forest, Cookies & Cream, Chocolate.",
                    calories: 0,
                    price: 200
                },
            ]

        }


    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)


    function onSelectCategory(category) {
        // Filter Restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }
    

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }


 const [loading, setLoading] = useState(false);

    const onFacebookSigninPress = async () => {
        setLoading(true);
        try {
            await Facebook.initializeAsync({
                appId: '175336151175922',
            }); // Facebook App Id 
            const { type,
                token, 
                expirationDate,
                permissions,
                declinedPermissions,
                } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email'],
                });
            if (type === 'success') {   
                // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH

                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        return firebase.auth().signInWithCredential(credential)
                            .then(user => {
                                // All the details about user are in here returned from firebase            
                                // console.log("fb signin", user);   
                                console.log("facebook login ", user, user.additionalUserInfo);
                                let userData = {
                                    provider: user.additionalUserInfo.providerId,
                                    family_name: user.additionalUserInfo.profile.last_name,
                                    given_name: user.additionalUserInfo.profile.first_name,
                                    displayName: user.additionalUserInfo.profile.name,
                                    email: user.additionalUserInfo.profile.email,
                                    lastLoginAt: new Date().toString(),
                                    photoURL: user.additionalUserInfo.profile.picture.data.url,
                                    uid: user.user.uid,

                                }
                                console.log("userdata", userData)
                                saveAUser(userData);
                                navigation.navigate("Home");
                                // onLoginSuccess(userData);
                            })
                            .catch((error) => {
                                console.log('Error occurred ', error)
                                setLoading(false);
                            });
                    });


            } else {
                setLoading(false);
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '269912766463-2566lmcnpgvgtiirhrrdnfen8v3rauj5.apps.googleusercontent.com',
          },
      );
    
      React.useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          
          const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
          firebase.auth().signInWithCredential(credential)
          .then(user => {
              console.log("successful google signin, who is user", user, user.additionalUserInfo);
              let userData = {
                provider: user.additionalUserInfo.providerId,
                displayName: user.additionalUserInfo.profile.name,
                email: user.additionalUserInfo.profile.email,
                lastLoginAt: new Date().toString(),
                uid: user.user.uid,

            }
            console.log("userdata", userData)
            saveAUser(userData);
            navigation.navigate("Home");
          });
        }
      }, [response]);

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>MARK OCAMPO</Text>
                <Text style={{ ...FONTS.h1 }}>ONLINE FOOD DELIVERY</Text>

                <View>
        <View style={styles.container1} >
<Text style= {styles.text}>Login using </Text>
<Entypo name="facebook" size={35} color="blue" onPress={onFacebookSigninPress}/>
<Text style= {styles.text}> or </Text>
<Zocial name="gmail" size={31} color="red" onPress={() => {promptAsync();}}/>
        </View></View>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", {
                    item,
                    currentLocation
                })}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    container1: {
        alignItems: 'stretch',
        flexDirection: 'row',
        marginTop: 20,
    
    },
    text: {
        fontSize: 20,
        color: 'blue'

    }
})

export default Home