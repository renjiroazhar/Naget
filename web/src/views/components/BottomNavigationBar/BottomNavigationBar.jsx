import React from "react";
import { TabBar } from "antd-mobile";
import { Icon } from "antd";
import { withRouter } from "react-router-dom";
import "./style/style.css";

const BottomNavigationBar = props => {
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        bottom: "0"
      }}
    >
      <TabBar
        unselectedTintColor="#696969"
        tintColor="#fecb00ff"
        style={{ height: "56px", fontSize: "19px" }}
        barTintColor="white"
      >
        <TabBar.Item
          title="Home"
          key="list"
          icon={<Icon style={{ fontSize: "19px" }} type="home" />}
          selectedIcon={<Icon style={{ fontSize: "19px" }} type="home" />}
          selected={props.selectedTab === "home"}
          onPress={() => {
            props.history.push("/");
            props.onChangeTab("home");
          }}
        />

        <TabBar.Item
          icon={<Icon style={{ fontSize: "19px" }} type="reconciliation" />}
          // selectedIcon={
          // 	<Icon style={{ fontSize: '19px' }} type="reconciliation" />
          // }
          title="Order"
          key="order"
          // dot
          // selected={props.selectedTab === 'order'}
          onPress={() => {
            props.history.push("/order");
            props.onChangeTab("order");
          }}
        />
        <TabBar.Item
          icon={<Icon style={{ fontSize: "19px" }} type="user" />}
          // selectedIcon={<Icon style={{ fontSize: '19px' }} type="user" />}
          title="Account"
          key="account"
          // selected={props.selectedTab === 'account'}
          onPress={() => {
            props.history.push("/account");
            props.onChangeTab("account");
          }}
        />
      </TabBar>
    </div>
  );
};

export default withRouter(BottomNavigationBar);
