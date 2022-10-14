import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment-timezone'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const WeatherItem = ({ title, value, unit }) => {
  return (
    <View style={styles.WeatherItem}>
      <Text style={styles.WeatherItemTitle}>{title}</Text>
      <Text style={styles.WeatherItemTitle}>
        {value}
        {title}
      </Text>
    </View>
  )
}

const DateTime = ({ current, lat, lon, timezone }) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? 'pm' : 'am';

      setTime((hoursIn12Format < 10? "0" + hoursIn12HrFormat : hoursIn12HrFormat) + ":" + (minutes < 10? "0" + minutes : minutes) + ampm);

      setDate(days[day] + "," + date + months[month])
    },1000);
  }, [])
  return (
    <View style={styles.container}>
        <View>
            <View>
                <Text style={styles.heading}>{item}</Text>
            </View>
            <View>
                <Text style={styles.subheading}>{date}</Text>
            </View>
            <View style={styles.WeatherItemContainer}>
                <WeatherItem title="Humidity" value={current? current.humidity: ""} unit="%" />
                <WeatherItem title="Pressure" value={current? current.pressure: ""} unit="hPa" />
                <WeatherItem title="Sunrise" value={current? moment.tz(current.sunrise *  1000, timezone).format("HH:mm"): ""} unit="am"/>
                <WeatherItem title="Sunset" value={current? moment.tz(current.sunset *  1000, timezone).format("HH:mm"): ""} unit="am"/>
            </View>
        </View>
        <View style={styles.rightAlign}>
            <Text style={styles.timezone}>{timezone}</Text>
            <Text style={styles.latlong}>{lat}N {long}E</Text>
        </View>
    </View>
  )
};


const style = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15, 
    },
    heading: {
        fontSize: 45,
        color: "white",
        fontWeight: "100",
    },
    subheading: {
        fontSize: 25,
        color: "#eee",
        fontWeight: 300
    },
    rightAlign: {
        textAlign: "right",
        marginTop: 20
    },
    timezone: {
        fontSize: 20,
        color: "white"
    },
    latlong: {
        fontSize: 16,
        color: "white",
        fontWeight: "700"
    },
    WeatherItemContainer: {
        backgroundColor: "#181818",
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    },
    WeatherItem: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    WeatherItemTitle: {
        color: "#eee",
        fontSize: 14,
        fontWeight: "100",
    }
})

export default DateTime;