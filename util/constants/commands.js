const commands = [
    {
        name: "/comandos",
        description: "Apresenta todos os comandos disponíveis para o Bot da Donleta!"
    },
    {
        name: "/dia",
        description: "Apresenta os resultados diários da Donleta, ou os resultados de um dia especificado pelo usuário!"
    },
    {
        name: "/perfil",
        description: "Apresenta os ultimos 3 resultados do usuário na Donleta! Você pode linkar sua conta do Discord com o seu perfil da Donleta usando o commando `/link` (wip) permitindo que não seja necessário especificar o usuário sempre que for enviado o comando!"
    },
    {
        name: "/ping",
        description: "Confira se o Bot ainda está vivo e funcionando!"
    },
    {
        name: "/rank",
        description: "Apresenta os resultados mensais da Donleta, ou os resultados de um mês especificado pelo usuário!"
    },
    {
        name: "/semana",
        description: "Apresenta or resultados mensais da Donleta, ou os resultados de uma semana especificada pelo usuário!"
    },
]

module.exports = {
    commands
}