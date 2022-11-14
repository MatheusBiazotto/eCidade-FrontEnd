<template>
  <div class="align-back">
    <div class="container-graph">
      <div class="graph">
        <img class="graph-img" src="graph.png" alt="" />
      </div>
      <div class="split-container">
        <hr class="hr-vert" />
      </div>
      <div class="container-write">
        <h4>Meus casos: {{ qttd_data }}</h4>
      </div>
    </div>
    <div class="container-button">
      <button @click="abrirModal1">+ Nova Reclamação</button>
    </div>
    <div class="container-chamados">
      <div class="chamados-menu">
        <h4 style="color: #a616f3">Seus chamados ({{ qttd_data }})</h4>
        <h4>Perto de você</h4>
      </div>
      <hr class="hr-hori" />
      <div class="chamados-main">
        <h4 v-show="this.data.length == 0">Nenhum chamado registrado.</h4>
        <div
          v-show="this.data.length > 0"
          class="chamados"
          v-for="item in data"
          :key="item.id"
        >
          <div class="card-chamados">
            <h4>Chamado N°{{ item.id }}</h4>
            <h6>{{ item.attributes.descricao }}</h6>
            <div class="card-chamados-row">
              <h6>
                <img src="icon-calendar.png" alt="" />
                {{ formatDate(item.attributes.publishedAt) }}
              </h6>

              <h6 v-show="item.attributes.categoria == 'Energia'">
                <img src="icon-eletric.png" alt="" />
                {{ item.attributes.categoria }}
              </h6>
              <h6 v-show="item.attributes.categoria == 'Água'">
                <img src="icon-agua.png" alt="" />
                {{ item.attributes.categoria }}
              </h6>
              <h6 v-show="item.attributes.categoria == 'Trânsito'">
                <img src="icon-transit.png" alt="" />
                {{ item.attributes.categoria }}
              </h6>
              <h6 v-show="item.attributes.categoria == 'Locais'">
                <img src="icon-park.png" alt="" />
                {{ item.attributes.categoria }}
              </h6>
              <h6 v-show="item.attributes.categoria == 'Outros'">
                <img src="icon-more.png" alt="" />
                {{ item.attributes.categoria }}
              </h6>

              <h6>
                <img src="icon-locale.png" alt="" />{{
                  item.attributes.endereco
                }}
              </h6>
            </div>
            <hr class="hr-hori" />
          </div>
        </div>
      </div>
    </div>

    <div class="fade hide"></div>

    <div id="modal1" class="modal1">
      <h4>Ohhh... Sentimos muito que você tenha tido um problema.</h4>
      <div class="split-content-modal1">
        <div class="container-shiba-modal1">
          <img src="shiba-sad.png" alt="" />
        </div>
        <div class="texto-modal1">
          Olá, eu sou o Shiba, seu assistente virtual. Por favor, me conte um
          pouco mais sobre seu problema!
          <button @click="abrirModal2">Vamos lá!</button>
        </div>
      </div>
    </div>

    <div id="modal2" class="modal2">
      <h4>Selecione a categoria do seu problema:</h4>
      <div class="back-selections-modal2">
        <div @click="abrirModal3('Energia')">
          <img src="icon-eletric.png" alt="" />
          <h4>Energia</h4>
        </div>
        <div @click="abrirModal3('Água')">
          <img src="icon-agua.png" alt="" />
          <h4>Água</h4>
        </div>
        <div @click="abrirModal3('Trânsito')">
          <img src="icon-transit.png" alt="" />
          <h4>Trânsito</h4>
        </div>
        <div @click="abrirModal3('Local')">
          <img src="icon-park.png" alt="" />
          <h4>Local</h4>
        </div>
        <div @click="abrirModal3('Outros')">
          <img src="icon-more.png" alt="" />
          <h4>Outros</h4>
        </div>
      </div>
    </div>

    <div id="modal3" class="modal3">
      <h4>Descreva seu problema</h4>
      <form @submit.prevent="postChamado">
        <textarea v-model="descricao" name="descricao" required></textarea>

        <div>
          <input type="submit" value="Finalizar" />
        </div>
      </form>
    </div>

    <div id="modal4" class="modal1">
      <h4>Caso registrado!</h4>
      <div class="split-content-modal1">
        <div class="container-shiba-modal1">
          <img src="shiba-happy.png" alt="" />
        </div>
        <div class="texto-modal1">
          <span>Registramos seu problema! 🎉</span>
          <span
            >Trabalharemos para resolvê-lo o mais rápido possível. Pedimos
            desculpas pela inconveniência.</span
          >
          <button @click="fecharModal">Concluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ChamadosView",
  components: {},
  data() {
    return {
      data: [],
      qttd_data: 0,
      categoria: "",
      descricao: "",
    };
  },
  methods: {
    verifyLogin() {
      if (localStorage.getItem("user") == null) {
        this.$router.push("/");
      } else {
        this.getChamados();
      }
    },

    getChamados() {
      fetch(`${this.$store.state.url_chamados}`)
        .then((response) => response.json())
        .then((response) => {
          this.data = response.data;
          console.log(this.data);
          this.qttd_data = this.data.length;
        });
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    abrirModal1() {
      document.getElementById("modal1").style.display = "flex";
      document.querySelector(".fade").style.display = "block";
    },

    abrirModal2() {
      document.getElementById("modal2").style.display = "flex";
      document.getElementById("modal1").style.display = "none";
    },

    abrirModal3(categoria) {
      this.categoria = categoria;
      document.getElementById("modal3").style.display = "flex";
      document.getElementById("modal2").style.display = "none";
    },

    postChamado() {
      if (this.descricao.length < 20) {
        alert("Forneça uma descrição mais detalhada.");
      } else {
        const body = {
          data: {
            categoria: `${this.categoria}`,
            descricao: `${this.descricao}`,
            endereco: "Rua teste da Silva, 123 - Jd. Teste",
            external_user: 2,
          },
        };

        fetch(this.$store.state.url_chamados_post, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
          });

        document.getElementById("modal3").style.display = "none";
        document.getElementById("modal4").style.display = "flex";
        this.getChamados();
      }
    },

    fecharModal() {
      document.getElementById("modal4").style.display = "none";
      document.querySelector(".fade").style.display = "none";
    },
  },
  mounted() {
    this.verifyLogin();
  },
};
</script>

<style>
.align-back {
  background-color: #d6d6d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.container-graph {
  padding: 1%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #fff;
  border-radius: 20px;
  width: 60vw;
}

.graph {
  display: flex;
  justify-content: center;
  align-items: center;
}

.graph-img {
  width: 150px;
}

.split-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hr-vert {
  width: 3px;
  height: 200px;
  background: #000;
  border: none;
}

.hr-hori {
  width: 90%;
  height: 2px;
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
  background: #cacaca;
  border: none;
}

.container-write {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container-write > h4 {
  font-size: 25px;
  font-weight: 600;
}

.container-button {
  margin-top: 20px;
  width: 60vw;
  display: flex;
  align-items: flex-start;
}

.container-button > button {
  border-radius: 20px;
  height: 50px;
  width: 30%;
  font-size: 18px;
  font-weight: 600;
  background-color: #e01cb9;
  color: #fff;
  border: none;
  cursor: pointer;
}

.container-chamados {
  padding: 1%;
  margin-top: 20px;
  width: 60vw;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-items: flex-start;
  background-color: #fff;
  border-radius: 20px;
}

.chamados-menu {
  display: flex;
  flex-direction: row;
}

.chamados-menu > h4 {
  font-size: 20px;
  font-weight: 600;
  margin-right: 50px;
  cursor: pointer;
}

.card-chamados > h4 {
  color: #0085ff;
  font-size: 20px;
}

.card-chamados > h6 {
  color: #666666;
  font-size: 14px;
  font-weight: 500;
}

.card-chamados-row {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.card-chamados-row > h6 > img {
  width: 20px;
}

/* MODAL */

.fade {
  display: none;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
}

.modal1 {
  display: none;
  align-items: center;
  justify-content: center;
  height: 65vh;
  width: 65vh;
  z-index: 2;
  background-color: #fff;
  border-radius: 20px;
  flex-direction: column;
  padding: 1%;
  transform: translateY(-70%);
}

.modal1 > h4 {
  font-size: 25px;
  text-align: center;
}

.split-content-modal1 {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container-shiba-modal1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container-shiba-modal1 > img {
  width: 150px;
}

.texto-modal1 {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.texto-modal1 > span {
  text-align: center;
}

.texto-modal1 > button {
  margin-top: 15px;
  width: 80%;
  height: 50px;
  font-size: 20px;
  border-radius: 20px;
  border: none;
  background-color: #00a3ff;
  color: #fff;
  cursor: pointer;
}

.modal2 {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  width: 60vw;
  height: 30vh;
  z-index: 2;
  transform: translateY(-50%);
  padding: 1%;
}

.modal2 > h4 {
  font-size: 25px;
  text-align: center;
}

.back-selections-modal2 {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.back-selections-modal2 > div > img {
  width: 100px;
}

.back-selections-modal2 > div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 10vw;
  height: 10vw;
  padding: 1%;
  border-radius: 20px;
  background-color: #e6e6e6;
  cursor: pointer;
}

.modal3 {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 1%;
  border-radius: 20px;
  width: 40vw;
  height: 40vh;
  z-index: 2;
  transform: translateY(-50%);
}

.modal3 > h4 {
  font-size: 25px;
}

.modal3 > form > textarea {
  border: none;
  border-radius: 20px;
  padding-left: 10px;
  background-color: #d9d9d9;
  width: 500px;
  height: 150px !important;
  font-size: 20px;
  padding-top: 10px;
}

.modal3 > form > div {
  display: flex;
  flex-direction: row-reverse;
}

.modal3 > form > div > input {
  width: 50%;
  height: 40px;
  font-size: 20px;
  border-radius: 20px;
  border: none;
  background-color: #00a3ff;
  color: #fff;
  cursor: pointer;
}
</style>