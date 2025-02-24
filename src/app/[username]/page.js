"use client";
import React, { useContext, use, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "@/context/AuthContext";
import PageDivision from "@/components/PageDivision";
import { USER_GET_BY_USERNAME, USER_PUT, PROFILE_PICTURE_PUT, PROFILE_COVER_PUT  } from "@/api";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";

export default function Page({ params }) {
  const { user, token, userSet } =
    useContext(AuthContext);

  const newUsername = useForm("username", false);
  const newEmail = useForm("email", false);
  const newProfilePicture = useForm("profilePicture", false);
  const newName = useForm("name", false);
  const newBio = useForm("bio", false);
  const newProfileCover = useForm("profileCover", false);
  const resolvedParams = use(params);

  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
  const [currentProfileCover, setCurrentProfileCover] = useState(null);
  const [lastProfilePicture, setLastProfilePicture] = useState(null);
  const [lastProfileCover, setLastProfileCover] = useState(null);

  const isOwnProfile = user === resolvedParams.username;

  const profilePictureRef = useRef(null);
  const formRef = useRef(null);
  const profileCoverRef = useRef(null);

  const [profileOwner, setProfileOwner] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditProfile = () => {
    if (!editMode) {      
      newUsername.setValue(profileOwner.username || "");
      newEmail.setValue(profileOwner.email || "");
      newName.setValue(profileOwner.name || "");
      newBio.setValue(profileOwner.bio || "");

      setCurrentProfilePicture(currentProfilePicture || profileOwner.profilePicture);
      setCurrentProfileCover(currentProfileCover || profileOwner.profileCover);
    } else {
      setCurrentProfilePicture(lastProfilePicture);
      setCurrentProfileCover(lastProfileCover);
    }

    setEditMode(!editMode);
  };

  useEffect(() => {
    if (editMode) {
      console.log("editando");
    } else {
      console.log("salvando");
    }
  }, [editMode]);

  useEffect(() => {
    getUserByUsername(resolvedParams.username);
  }, [resolvedParams.username, isOwnProfile]);

  useEffect(() => {
    if (profileOwner) {
      newUsername.setValue(profileOwner.username || "");
      newEmail.setValue(profileOwner.email || "");
      newName.setValue(profileOwner.name || "");
      newBio.setValue(profileOwner.bio || "");
      newProfileCover.setValue(profileOwner.profileCover || "");
      newProfilePicture.setValue(profileOwner.profilePicture || "");
    }
  }, [profileOwner]);

  async function getUserByUsername(username) {
    const { url, options } = USER_GET_BY_USERNAME(username);

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setProfileOwner(json);
      } else {
        console.error("Erro ao buscar usuário:", json.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault();
  
    const userData = {
      username: newUsername.value,
      email: newEmail.value,
      name: newName.value,
      bio: newBio.value,
    };

    let updatedProfilePicture = newProfilePicture.value;
    let updatedProfileCover = newProfileCover.value;
  
    const promises = [];
  
    try {
      const { url: userUrl, options: userOptions } = USER_PUT(token, userData);
      const userUpdatePromise = fetch(userUrl, userOptions)
        .then(async (response) => {
          if (!response.ok) {
            const errorJson = await response.json();
            throw new Error(errorJson.message || "Erro ao atualizar usuário.");
          }
          return response.json();
        })
        .then((json) => {
          console.log("Usuário atualizado:", json);
        });
  
      promises.push(userUpdatePromise);
  
      if (profilePictureRef.current && profilePictureRef.current.files.length > 0) {
        console.log("Atualizando foto de perfil...");
        const profilePictureData = new FormData();
        profilePictureData.append("profilePicture", profilePictureRef.current.files[0]);
  
        const { url: picUrl, options: picOptions } = PROFILE_PICTURE_PUT(
          profileOwner.id,
          profilePictureData,
          token
        );
  
        const profilePictureUpdatePromise = fetch(picUrl, picOptions)
          .then(async (response) => {
            if (!response.ok) {
              const errorJson = await response.json();
              throw new Error(errorJson.message || "Erro ao atualizar foto de perfil.");
            }
            return response.json();
          })
          .then((json) => {
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            updatedProfilePicture = json.profilePicture.startsWith("http")
              ? json.profilePicture
              : `${BASE_URL}${json.profilePicture}`;

            setLastProfilePicture(updatedProfilePicture || currentProfilePicture);
            setCurrentProfilePicture(updatedProfilePicture || lastProfilePicture);

          });
  
        promises.push(profilePictureUpdatePromise);
      }

      if (profileCoverRef.current && profileCoverRef.current.files.length > 0) {
        const profileCoverData = new FormData();
        profileCoverData.append("profileCover", profileCoverRef.current.files[0]);
  
        const { url: coverUrl, options: coverOptions } = PROFILE_COVER_PUT(
          profileOwner.id,
          profileCoverData,
          token
        );
  
        const profileCoverUpdatePromise = fetch(coverUrl, coverOptions)
          .then(async (response) => {
            if (!response.ok) {
              const errorJson = await response.json();
              throw new Error(errorJson.message || "Erro ao atualizar foto de capa.");
            }
            return response.json();
          })
          .then((json) => {
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            updatedProfileCover = json.profileCover.startsWith("http")
              ? json.profileCover
              : `${BASE_URL}${json.profileCover}`;
            console.log("Foto de capa atualizada:", json);

            setLastProfileCover(updatedProfileCover || currentProfileCover);
            setCurrentProfileCover(updatedProfileCover || lastProfileCover);
          });
  
        promises.push(profileCoverUpdatePromise);
      }

  
      await Promise.all(promises);

      console.log(updatedProfilePicture);
      console.log(!updatedProfilePicture.includes("fakepath"))
      console.log(profileOwner.profilePicture);
      console.log(currentProfilePicture);

      const updatedUserData = {
        username: newUsername.value || profileOwner.username,
        email: newEmail.value || profileOwner.email,
        name: newName.value || profileOwner.name,
        profilePicture: updatedProfilePicture && !updatedProfilePicture.includes("fakepath") 
        ? updatedProfilePicture : currentProfilePicture,
        profileCover: updatedProfileCover || profileOwner.profileCover,
        bio: newBio.value || profileOwner.bio,
      };

      console.log("Salvando usuário no localStorage:", updatedUserData);

      userSet(updatedUserData);
      setProfileOwner(updatedUserData);
  
      setEditMode(false);
    } catch (error) {
      console.error("Erro durante a atualização:", error.message);
    }
  };
  

  function handleShowProfileprofilePicture() {
    if (profilePictureRef.current && profilePictureRef.current.files.length > 0) {
      const profilePicture = profilePictureRef.current.files[0];
  
      const imageUrl = URL.createObjectURL(profilePicture);
      setCurrentProfilePicture(imageUrl);
    }
  
    if (profileCoverRef.current && profileCoverRef.current.files.length > 0) {
      const profileCover = profileCoverRef.current.files[0];
  
      const coverUrl = URL.createObjectURL(profileCover);
      setCurrentProfileCover(coverUrl);
    }
  }
  
  

  return (
    <div>
      <PageDivision>
        {profileOwner ? (
          <div>
            <div className="profile-page">
              <div className="profile-page-container">
                <div className="rectangle">
                  <div className="profile-info">
                    <h1 className="profile-name">
                      {newName.value || profileOwner.name}
                    </h1>
                    <h2 className="profile-username">
                      @{newUsername.value || profileOwner.username}
                    </h2>
                  </div>
                </div>
                <div className="">
                  {editMode ? (
                    <label className="circle profile-picture-overlay profile-picture-edit">
                      <svg
                        className="camera-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M12 17.5q1.875 0 3.188-1.312T16.5 13t-1.312-3.187T12 8.5T8.813 9.813T7.5 13t1.313 3.188T12 17.5m0-2q-1.05 0-1.775-.725T9.5 13t.725-1.775T12 10.5t1.775.725T14.5 13t-.725 1.775T12 15.5M4 21q-.825 0-1.412-.587T2 19V7q0-.825.588-1.412T4 5h3.15L8.4 3.65q.275-.3.663-.475T9.875 3h4.25q.425 0 .813.175t.662.475L16.85 5H20q.825 0 1.413.588T22 7v12q0 .825-.587 1.413T20 21z"
                        />
                      </svg>
                      <Input
                        type="file"
                        label="Foto de perfil"
                        placeholder="foto de perfil"
                        ref={profilePictureRef}
                        onChange={(e) => {
                          handleShowProfileprofilePicture(e);
                          newProfilePicture.onChange(e);
                        }}
                      />
                    </label>
                  ) : null}
                  <img
                    className="circle profile-picture-page"
                    src={currentProfilePicture || profileOwner.profilePicture}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="cover-photo-container">
                {editMode ? (
                  <label className="cover-photo-edit cover-photo-overlay">
                    <svg
                      className="camera-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        d="M12 17.5q1.875 0 3.188-1.312T16.5 13t-1.312-3.187T12 8.5T8.813 9.813T7.5 13t1.313 3.188T12 17.5m0-2q-1.05 0-1.775-.725T9.5 13t.725-1.775T12 10.5t1.775.725T14.5 13t-.725 1.775T12 15.5M4 21q-.825 0-1.412-.587T2 19V7q0-.825.588-1.412T4 5h3.15L8.4 3.65q.275-.3.663-.475T9.875 3h4.25q.425 0 .813.175t.662.475L16.85 5H20q.825 0 1.413.588T22 7v12q0 .825-.587 1.413T20 21z"
                      />
                    </svg>
                    <Input
                        type="file"
                        label="Foto de capa"
                        placeholder="foto de capa"
                        ref={profileCoverRef}
                        onChange={(e) => {
                          handleShowProfileprofilePicture(e);
                          newProfileCover.onChange(e);
                      }}
                    />
                  </label>
                ) : null}
                <img
                  className="cover-photo cover-photo-edit"
                  src={currentProfileCover || profileOwner.profileCover}
                  alt="cover"
                />
              </div>
              {isOwnProfile && (
                <button
                  className="btn btn-profile"
                  onClick={() => handleEditProfile()}
                >
                  {editMode ? "cancelar" : "editar"}
                </button>
              )}
            </div>
            <p className="bio">{String(newBio.value || profileOwner.bio || "Sem bio")}</p>
          </div>
        ) : (
          <h1>Ops! O usuário "{resolvedParams.username}" não existe</h1>
        )}
        {editMode ? (
          <div>
            <form
              ref={formRef}
              onSubmit={handleEdit}
              className="update-profile-form"
            >
              <div className="update-name-username">
                <Input label="Nome" type="text" name="name" {...newName} />
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  {...newUsername}
                />
              </div>
              <Input label="Email" type="email" name="email" {...newEmail} />
              <Input label="Bio" type="text" name="bio" {...newBio} />
              <button type="submit" className="btn btn-update-profile">
                salvar
              </button>
            </form>
          </div>
        ) : (
          <div>oiiiii</div>
        )}
      </PageDivision>
    </div>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
