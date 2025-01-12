
import React from "react";
import { Card, Row, Col, Button } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { profileData } from "./profileData";
import "./ProfileHeader.css";

const ProfileHeader = () => {
  const { name, bio, role, organization, location, banner, profilePicture, work, education } =
    profileData;

  return (
    <>
    <Card
      className="profile-header-card"
      cover={
        <img
          alt="banner"
          src={banner}
          className="profile-banner-img"
        />
      }
      bordered={false}
    >
      {/* Profile Picture */}
      <div className="profile-picture-wrapper">
        <img
          src={profilePicture}
          alt="profile"
          className="profile-picture"
        />
      

      {/* Profile Info */}
      <Row gutter={[1000, 8]} align="middle" justify="space-between">
        <Col span={25}>
          <div className="profile-basic-details">
            <h1>{name}</h1>
            <p>{role} @ {organization}</p>
            <p>
              <EnvironmentOutlined /> {location}
            </p>
          </div>
        </Col>  
        
        <Col span={35} className="profile-actions">
          <Button type="primary" shape="round" className="edit-btn">
            Edit
          </Button>
        </Col>
        
      </Row>
      </div>

      {/* Additional Details
      <Row gutter={[16, 16]} className="additional-info">
        <Col span={12}>
          <Card bordered={true}>
            <h4>Work</h4>
            <p>{work}</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={true}>
            <h4>Education</h4>
            <p>{education}</p>
          </Card>
        </Col>
      </Row> */}
    </Card>
    </>
  );
};

export default ProfileHeader;
