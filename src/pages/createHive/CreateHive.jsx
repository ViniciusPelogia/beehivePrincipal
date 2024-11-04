/* eslint-disable no-unused-vars */
import "./CreateHive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CreateHive() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [hiveName, setHiveName] = useState("");
  const [hiveDescription, setHiveDescription] = useState("");
  const [hivePassword, setHivePassword] = useState("");
  const [hiveImage, setHiveImage] = useState(null);
  const [hiveImageUrl, setHiveImageUrl] = useState("");
  const [hiveType, setHiveType] = useState("");
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:3000/tipo/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTypes(response.data);
        } else {
          console.error("A resposta da API não é um array:", response.data);
          setTypes([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar os tipos!", error);
        setTypes([]);
      });
  }, []);

  const handleCheckboxChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!hiveName.trim()) {
      alert("O nome da Hive é obrigatório");
      return;
    }
    if (!hiveDescription.trim()) {
      alert("A descrição da Hive é obrigatória");
      return;
    }
    if (!hiveType.trim()) {
      alert("O tipo da Hive é obrigatório");
      return;
    }
    if (!hiveImage) {
      alert("A imagem da Hive é obrigatória");
      return;
    }

    const formData = new FormData();
    formData.append("nome", hiveName);
    formData.append("imagem", hiveImage || "");
    formData.append("descricao", hiveDescription);
    formData.append("privada", isPrivate);
    formData.append("codigo_acesso", hivePassword);
    formData.append("tipo_id", hiveType);

    const accessToken = localStorage.getItem("accessToken");
    const id = localStorage.getItem("userId");

    axios
      .post(`http://localhost:3000/hive/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Hive criada com sucesso:", response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Erro ao criar a Hive!", error);
        if (error.response) {
          console.log("Erro no servidor:", error.response.data);
        } else {
          console.log("Erro desconhecido", error.message);
        }
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHiveImage(file);
      setHiveImageUrl(URL.createObjectURL(file));
    } else {
      setHiveImage(null);
      setHiveImageUrl("");
    }
  };

  return (
    <>
      <Sidebar />
      <main id="create_hive" className="page_layout">
        <section>
          <h2 className="title">Criar Hive</h2>
          <form className="hive_form" onSubmit={handleSubmit}>
            <div className="hive_image_container">
              <div className="hive_image">
                {hiveImageUrl && <img src={hiveImageUrl} alt="Hive" />}
              </div>
              <div className="Hive_image_button_container">
                <input
                  type="file"
                  id="hive_input_image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="hive_input_image" className="hive_input_label">
                  Adicionar imagem
                </label>
              </div>
            </div>
            <div className="hive_inputs_container">
              <input
                type="text"
                placeholder="Hive name..."
                className="hive_input"
                value={hiveName}
                onChange={(e) => setHiveName(e.target.value)}
              />
              <textarea
                rows="5"
                placeholder="Hive description..."
                className="hive_input"
                value={hiveDescription}
                onChange={(e) => setHiveDescription(e.target.value)}
              ></textarea>
              <div className="hive_private_input">
                <input
                  id="private_input"
                  type="checkbox"
                  checked={isPrivate}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="private_input">Hive Privada</label>
              </div>
              <input
                type="text"
                placeholder="Hive password..."
                className="hive_input"
                value={hivePassword}
                onChange={(e) => setHivePassword(e.target.value)}
                disabled={!isPrivate}
              />
              <label htmlFor="hive_type">Selecione o tipo da sua Hive:</label>
              <select
                name="hive_type"
                id="hive_type"
                className="hive_input"
                value={hiveType}
                onChange={(e) => setHiveType(e.target.value)}
              >
                <option value="">Escolha o tipo</option>
                {Array.isArray(types) &&
                  types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.tipo}
                    </option>
                  ))}
              </select>
            </div>
            <button type="submit" className="create_hive_button">
              Criar
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateHive;
