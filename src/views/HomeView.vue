<template>
  <div class="background-img"></div>
  <div class="background-linear"></div>
  <div class="align-back-form">
    <div class="back-form">
      <img src="logo.png" alt="" />
      <h4>Seu portal de cidadão</h4>

      <form class="form" @submit.prevent="LogIn">
        <input v-model="email" type="text" placeholder="Email" required/>
        <input v-model="senha" type="password" placeholder="Senha" required/>

        <span>Não tem uma conta? Cadastre-se!</span>

        <input type="submit" value="Entrar" />

        <span>Esqueceu sua senha? Toque aqui!</span>
      </form>
      <h4 style="color: #000">OU</h4>
      <div class="login-buttons">
        <button style="background-color: #ff4242" value="Entrar com Google">
          <img src="google.png" alt="" />
        </button>
        <button style="background-color: #3967c0" value="Entrar com Google">
          <img src="facebook.png" alt="" />
        </button>
        <button style="background-color: #fff" value="Entrar com Google">
          <img src="govbr.png" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    LogIn() {

      fetch(`${this.$store.state.url}?filters[email][$eq]=${this.email}&filters[senha][$eq]=${this.senha}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.data.length > 0) {
            localStorage.setItem("user", JSON.stringify(response.data));
            this.$router.push("/chamados");
          } else {
            alert("Usuário ou senha incorretas");
          }
        });

        
    },
  },
};
</script>

<style scoped>
.align-back-form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.background-img {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, #d9d9d9 90.25%),
    url("https://thumbs.gfycat.com/CarefreeRightAmericanredsquirrel-size_restricted.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  height: 50vh;
  position: absolute;
  z-index: -99;
}

.background-linear {
  background: #d9d9d9;
  width: 100vw;
  height: 50vh;
  position: absolute;
  z-index: -99;
  transform: translateY(50vh);
}

.back-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  width: 30vw;
  padding: 4%;
}

.back-form > h4 {
  font-weight: 100;
  color: #ac60ad;
}

.form {
  display: flex;
  flex-direction: column;
}

form > span {
  margin-top: 10px;
  color: #0085ff;
  font-weight: bold;
}

.form > input {
  width: 100%;
  height: 40px;
  font-size: 18px;
  border-radius: 20px;
  padding-left: 10px;
  margin-top: 15px;
  background-color: #d9d9d9;
  border: none;
  color: #2d2e30;
}

.form > input[type="submit"] {
  background-color: #00c2ff;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  font-weight: 100;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.login-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

button {
  padding: 5px;
  border-radius: 20px;
  border: none;
  height: 50px;
  width: 100%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>