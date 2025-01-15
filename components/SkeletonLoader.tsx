import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const SkeletonLoader = () => {
    const shimmerValue = React.useRef(new Animated.Value(0)).current;

    // Get screen width for calculating translateX
    const screenWidth = Dimensions.get('window').width;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerValue, {
                    toValue: screenWidth, // Move shimmer across the width of the screen
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerValue, {
                    toValue: 0, // Reset shimmer to starting position
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [screenWidth, shimmerValue]);

    return (
        <View style={styles.skeletonContainer}>
            {/* Example placeholders */}
            <View style={[styles.skeleton, styles.image]} />
            <View style={[styles.skeleton, styles.text]} />
            <View style={[styles.skeleton, styles.text]} />
            <View style={[styles.skeleton, styles.text, { width: '70%' }]} />
            <View style={[styles.skeleton, styles.button]} />

            {/* Shimmer Animation */}
            <Animated.View
                style={[
                    styles.shimmer,
                    {
                        transform: [{ translateX: shimmerValue }], // Use calculated translateX
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    skeleton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 10,
    },
    image: {
        height: 150,
        width: '100%',
    },
    text: {
        height: 15,
        width: '100%',
    },
    button: {
        height: 40,
        width: '50%',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: 1,
    },
});

export default SkeletonLoader;
