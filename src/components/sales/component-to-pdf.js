import React from 'react';
import {Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        // flexDirection: 'row',
        // backgroundColor: '#E4E4E4'
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    image: {
        width: 100,
        height: 50,
        left: 20,
        top: 20,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        // fontFamily: 'Oswald'
    },
    text: {
        margin: 5,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    header: {
        fontSize: 12,
        marginBottom: 5,
        top: -35,
        left: 130,
        textAlign: 'left',
        // color: 'grey',
    },
    text2First: {
        margin: 5,
        marginLeft: 5,
        marginRight: 90,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    text2: {
        margin: "5 50",
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    }
});

// Create Document Component
export const MyDocument = (a) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image
                style={styles.image}
                src="https://cdn3.iconfinder.com/data/icons/kaktus-plant-varian/32/ICON_KAKTUS_icon_plants-512.png"/>
            <Text style={styles.header} fixed>
                xxxxx: xxxxxxxx
            </Text>
            <Text style={styles.header} fixed>
                xxxxx: xxxxxxxx
            </Text>
            <Text style={styles.header} fixed>
                xxxxx: xxxxxxxx
            </Text>
            <Text style={styles.header} fixed>
                xxxxx: xxxxxxxx
            </Text>
            <Text style={styles.title}>XXXXXXX</Text>
            <View style={{flexDirection: 'row', marginTop: '10'}}>
                <Text style={styles.text2First}>xxxx: xxxx</Text>
                <Text style={styles.text2}>date: 09/09/2020</Text>
                <Text style={styles.text2}>xxxx: xxxx</Text>
            </View>
            <Text style={styles.text}>Don Quijote de la Mancha</Text>
            <Text style={styles.text}>Don Quijote de la Mancha</Text>
            <Text style={styles.text}>Don Quijote de la Mancha</Text>
            <View style={{flexDirection: 'row', marginTop: '10'}}>
                <Text style={styles.text2First}>xxxx: xxxx</Text>
                <Text style={styles.text2}>date: 09/09/2020</Text>
                <Text style={styles.text2}>xxxx: xxxx</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: '10'}}>
                <Text style={{width: "100PX"}}>xxxx: xxxx</Text>
                <Text style={{width: "20PX"}}>date: 09/09/2020</Text>
                <Text style={{width: "20PX"}}>xxxx: xxxx</Text>
                <Text style={{width: "20PX"}}>xxxx: xxxx</Text>
                <Text style={{width: "40PX"}}>xxxx: xxxx</Text>
            </View>
            <Text style={styles.text}>
                En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
                mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
                antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
                carnero, salpicón las más noches, duelos y quebrantos los sábados,
                lentejas los viernes, algún palomino de añadidura los domingos,
                consumían las tres partes de su hacienda. El resto della concluían sayo
                de velarte, calzas de velludo para las fiestas con sus pantuflos de lo
                mismo, los días de entre semana se honraba con su vellori de lo más
                fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
                que no llegaba a los veinte, y un mozo de campo y plaza, que así
                ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro
                hidalgo con los cincuenta años, era de complexión recia, seco de carnes,
                enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que
                tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna
                diferencia en los autores que deste caso escriben), aunque por
                conjeturas verosímiles se deja entender que se llama Quijana; pero esto
                importa poco a nuestro cuento; basta que en la narración dél no se salga
                un punto de la verdad
            </Text>
        </Page>
    </Document>
);