import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform } from 'react-native';

export default function Panel(props) {
    const ctaStyle = styles.cta;
    return (
        <View style={[styles.container]}>
            <Header title={props.title} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {props.data.map((item, index) => {
                    return (
                        <View style={ctaStyle} key={`${item.id}${index.toString()}`}>                            
                            <Text style={[styles.sectionHeaderText]}>{item.name}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
};

const Header = ({title}) => {
    return (
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionHeaderText]}>{title}</Text>
        </View>
    )
};

export const dividerColor = StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)';
export const dividerStyle = {
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderColor:dividerColor
};

Panel.defaultProps = {
    data: [],
    style: {},
    title: null,
    cols: 0,
    showDivider: true
};

const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    },
    singleCol:{paddingVertical: 8},
    multiCol:{flex: 1, flexDirection: 'column', padding: 8},
    sectionHeader: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8 * 1.5
    },
    sectionHeaderText: {
        color: '#363434',
        fontSize: 19,
        fontWeight: 'bold',
        fontFamily: font,
        flex: 1
    },
    cta: {
        color: "#D1644F",
        fontSize: 15,
        fontFamily: font,
        color: '#363434',
        marginBottom: 6,
        fontWeight: 'bold',
        minWidth: 100,
        backgroundColor: '#fff',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: "#c2c4cb",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.81,
        shadowRadius: 5.16,
        elevation: 20,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10                     
    }
});