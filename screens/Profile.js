import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { HeaderBar } from "../components";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../constants";
import MainLayout from "./MainLayout";

const SectionTitle = ({ title }) => {
  return (
    <View style={{ marginTop: SIZES.padding }}>
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
    </View>
  );
};

const SettingBar = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          // height: "50",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ color: COLORS.white, flex: 1, ...FONTS.h3 }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  } else {
  }
};

const Profile = () => {
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header */}
        <HeaderBar title="Profile" />

        {/* Details */}
        <ScrollView>
          {/* Email and User ID */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
            }}
          >
            {/* Email and ID */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {dummyData.profile.email}
              </Text>
              <Text style={{ color: COLORS.lightGray3, ...FONTS.body4 }}>
                ID: {dummyData.profile.id}
              </Text>
            </View>

            {/* Status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.verified}
                style={{ height: 25, width: 25 }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}
              >
                Verified
              </Text>
            </View>
          </View>

          {/* App */}
          <SectionTitle title="App" />

          <SettingBar
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log("Pressed")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
