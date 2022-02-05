-- FICHEIRO DE QUERIES DA BASE DE DADOS EcoBe

SELECT (uti_genero), AVG(uti_pontosTotal) as 'media' FROM Utilizador GROUP BY uti_genero;
SELECT uti_genero, COUNT(uti_genero) as num FROM Utilizador GROUP BY uti_genero;
SELECT uti_genero, COUNT(uti_genero) FROM Utilizador WHERE uti_genero = "feminino";
-- QUERY LIXO APANHADO NAS PRAIAS
SELECT praia_nome, AVG(par_lixo)
FROM Evento
JOIN praias
ON evento.eve_praia_id = praias.praia_id
JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
JOIN participa
ON participa.par_eve_id = evento.eve_id
JOIN utilizador
ON utilizador.uti_id = participa.par_uti_id
GROUP BY praia_nome;

-- QUERIES TODOS OS DADOS DAS TABELAS
SELECT * FROM Utilizador;
SELECT * FROM Staff;
SELECT * FROM Colaborador;
SELECT * FROM Praias;
SELECT * FROM Evento; 
SELECT * FROM Participa; 


-- QUERY DA LOTACAO
SELECT COUNT(utilizador.uti_nomeP)
FROM utilizador
JOIN participa ON uti_id = participa.par_uti_id
JOIN evento ON evento.eve_id = participa.par_eve_id
WHERE eve_id = 2; 

-- QUERIES MAIS IMPORTANTES:

-- QUERY DE EVENTOS DE UM COLABORADOR EM ESPECÍFICO
SELECT *
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
WHERE cola_id = 1;

-- QUERY DE IR BUSCAR AS PESSOAS DENTRO DE UM EVENTO
SELECT utilizador.uti_nomeP, utilizador.uti_nomeU, evento.eve_id
FROM utilizador
JOIN participa ON uti_id = participa.par_uti_id
JOIN evento ON evento.eve_id = participa.par_eve_id
WHERE eve_id = 2; 

-- QUERY DA DESCRIÇÃO DO EVENTO POR ID
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, eve_estado, evento.eve_datainicio
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
WHERE eve_id = 1;

-- QUERY DE IR BUSCAR EVENTO DE UM COLABORADOR
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, eve_estado, evento.eve_datainicio
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
WHERE cola_nome = "Afonso Martins";

-- QUERY DA DESCRIÇÃO DOS EVENTOS TODOS BASE DE DADOS
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, evento.eve_datainicio, eve_categoria, eve_estado
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
ORDER BY(eve_lotacao);

-- QUERY DOS EVENTOS NÃO INICIADOS
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, evento.eve_datainicio, evento.eve_lotacao
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
WHERE eve_estado = 'Não iniciado';

-- QUERY DOS EVENTOS INICIADOS
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, evento.eve_datainicio, evento.eve_lotacao
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
WHERE eve_estado = 'Iniciado';

-- QUERY DOS EVENTOS A INICIAR
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, evento.eve_datainicio, evento.eve_lotacao
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
WHERE eve_estado = 'A iniciar';

-- QUERY DOS EVENTOS FINALIZADOS
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, evento.eve_lotacao, evento.eve_datainicio, evento.eve_datafim
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
WHERE eve_estado = 'Finalizado';

-- QUERY LEADERBOARD
SELECT CONCAT(uti_nomeP, ' ', uti_nomeU) AS 'Pessoa', uti_username AS 'username', uti_pontosTotal AS 'Pontos' FROM utilizador ORDER BY uti_pontosTotal DESC;
SELECT uti_nomeP FROM utilizador ORDER BY uti_pontosTotal DESC;

-- QUERY VER INFO DA PESSOA EM ESPECÍFICO (ALTERAR ATRIBUTO uti_username POR VARIÁVEL NO SERVIDOR)
SELECT uti_pontosTotal, uti_eventosTotal, uti_idade, uti_username, uti_rank FROM utilizador WHERE uti_username = 'inesmaria457';



-- VERIFICAÇÃO DO TRIGGER E TESTAR TRIGGER NO FRONT-END

-- Esta maneira de atualizar o atributo dos pontos do user temos PRIMEIRO ir buscar o select dos pontos desse user e depois somar com o input juntando tudo numa variável
-- NOTA: FUNCIONA COM O TRIGGER trigger_rankUpdate
UPDATE utilizador
SET uti_pontosTotal= 24
WHERE uti_username = '';

-- Esta maneira declara-se a variável na BD (countv) através do lado do servidor
-- NOTA: FUNCIONA COM O TRIGGER trigger_rankUpdate
SET @Countv = "25";
update utilizador set uti_pontosTotal = uti_pontosTotal + @Countv where uti_username = 'inesmaria457';
SELECT uti_pontosTotal, uti_rank FROM utilizador WHERE uti_username = 'inesmaria457';

-- 	QUERY QUE AJUDA NO LEAFLET
SELECT praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, evento.eve_datainicio, eve_categoria, eve_estado, praias.praia_latitude, praias.praia_longitude
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id;

-- USERS POR EVENTO
SELECT utilizador.uti_nomeP, praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, eve_estado, evento.eve_datainicio
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
INNER JOIN participa
ON participa.par_eve_id = evento.eve_id
INNER JOIN utilizador
ON utilizador.uti_id = participa.par_uti_id
WHERE eve_id = 1;

-- QUERY DE USER COM A SUA INSCRIÇÃO NUM EVENTO
SELECT *
FROM Utilizador
INNER JOIN participa
ON participa.par_uti_id = utilizador.uti_id
INNER JOIN evento
ON evento.eve_id = participa.par_eve_id
WHERE uti_id = 1;


-- QUERY HISTÓRIO DE EVENTOS DO UTILIZADOR
SELECT utilizador.uti_nomeP, praias.praia_nome, evento.eve_lotacao, colaborador.cola_nome, eve_estado, evento.eve_datainicio
FROM evento
INNER JOIN praias
ON evento.eve_praia_id = praias.praia_id
INNER JOIN colaborador
ON colaborador.cola_id = evento.eve_cola_id
INNER JOIN participa
ON participa.par_eve_id = evento.eve_id
INNER JOIN utilizador
ON utilizador.uti_id = participa.par_uti_id
WHERE uti_id = 1;

-- QUERYS EXTRAS
SELECT * FROM Utilizador WHERE uti_username = "andre123";
SELECT par_lixo FROM participa WHERE par_uti_id = 1 AND par_eve_id = 8;
UPDATE Utilizador SET uti_pontosTotal = ROUND((par_lixo(?)/10), 0) WHERE uti_id = par_uti_id(?);

-- QUERIES DE EVENTO EM ALTAS
SELECT * FROM OnFireEvents;
SELECT * FROM EVENTO WHERE eve_estado = "Não iniciado"; 
SELECT * FROM OnFireEvents ORDER BY(ofe_num) DESC LIMIT 1;
UPDATE OnFireEvents
SET ofe_num = ofe_num + 1
WHERE ofe_eve_id = ?