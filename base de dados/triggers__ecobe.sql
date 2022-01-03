-- FICHEIRO DE TRIGGER DA BASE DE DADOS EcoBe

-- TRIGGER DE SUBIDA DE RANK ATRAVÉS DOS PONTOS DO UTILIZADOR
-- DROP TRIGGER IF EXISTS trigger_rankUpdate
USE EcoBE;
DELIMITER $$
CREATE TRIGGER trigger_rankUpdate
BEFORE UPDATE 
ON EcoBe.Utilizador FOR EACH ROW
BEGIN 
IF NEW.uti_pontosTotal <=25 THEN
SET NEW.uti_rank = 'Principiante';
ELSEIF NEW.uti_pontosTotal >25 AND NEW.uti_pontosTotal<51 THEN
SET NEW.uti_rank = 'Amador';
ELSEIF NEW.uti_pontosTotal > 50 AND NEW.uti_pontosTotal < 76 THEN
SET NEW.uti_rank = 'Profissional';
ELSEIF NEW.uti_pontosTotal > 75 THEN
SET NEW.uti_rank = 'Mestre';
ELSE SET NEW.uti_rank = 'Sem Classificação';
END IF;
END;
$$  



-- TRIGGER QUE ADCIONA 1 ELEMENTO À LOTAÇÃO DO EVENTO QUANDO ALGO É INSERIDO NA TABELA PARTICIPA
-- NOTA: TRIGGER QUE SIMULA MAIS UMA PESSOA INSCRITA NUM CERTO EVENTO

-- DROP TRIGGER IF EXISTS trigger_lotacao
DELIMITER $$
    CREATE TRIGGER trigger_lotacao AFTER INSERT ON participa FOR EACH ROW
    BEGIN
    SET @COUNT= (SELECT COUNT(*)
	FROM utilizador
	JOIN participa ON uti_id = participa.par_uti_id
	JOIN evento ON evento.eve_id = participa.par_eve_id
	WHERE eve_id = 2); 
	UPDATE Evento SET Evento.eve_lotacao= @Count;
    END;
$$
DELIMITER ; 
-- TESTAR TRIGGER:
insert into Participa (par_uti_id, par_eve_id) values (20, 1); -- SIMULAR QUE O UTILIZADOR ESTÁ A SE INSCREVER NUM EVENTO
select eve_lotacao from evento where eve_id = 1; -- QUERY QUE DEMONSTRA O UPDATE NO ATRIBUTO DA LOTACAO DE UM DETERMINADO EVENTO




-- TRIGGER QUE MODIFICA O ESTADO DO EVENTO QUANDO A 10 PESSOA SE INSCREVE NESSE MESMO EVENTO

-- DROP TRIGGER IF EXISTS trigger_updateEstadoEvento
USE EcoBE;
DELIMITER $$
CREATE TRIGGER trigger_updateEstadoEvento
BEFORE UPDATE 
ON EcoBe.Evento FOR EACH ROW
BEGIN 
IF NEW.eve_lotacao = 10 THEN
SET NEW.eve_estado = 'A iniciar';
END IF;
END;
$$  
-- PARA TESTAR TRIGGER CRIOU-SE MAIS UM EVENTO COM 9 PESSOAS INSCRITAS PREVIAMENTE
insert into Evento (eve_id, eve_lotacao, eve_estado, eve_categoria, eve_datainicio, eve_cola_id, eve_praia_id) values (11, 9, 'Não iniciado', 'Adulto Sénior', '2021-12-23 11:00:00', 10, 10);
insert into Participa (par_uti_id, par_eve_id) values (11, 2); -- SIMULAR QUE O UTILIZADOR ESTÁ A SE INSCREVER NUM EVENTO
SELECT eve_lotacao FROM EVENTO WHERE eve_id =2;
DELETE FROM participa WHERE par_eve_id = 11;
DELETE FROM evento WHERE eve_id = 11;  
SELECT par_id FROM participa where par_eve_id = 11;
SELECT eve_estado FROM evento WHERE eve_id = 11;




-- TRIGGER DA BUSINESS RULE: INSERIR PONTOS QUANDO O UTILIZADOR O COLABORADOR INSERE O PESO DO LIXO DE UM DETERMINADO PARTICIPANTE

-- DROP TRIGGER IF EXISTS trigger_updatePontos
DELIMITER $$
CREATE TRIGGER trigger_updatePontos
BEFORE UPDATE 
ON EcoBe.Participa FOR EACH ROW
BEGIN 
IF NEW.par_lixo > 0 THEN
/*SET @COUNT=(SELECT COUNT(eve_lotacao) FROM Evento WHERE (eve_id=NEW.par_eve_id));*/
SET @PONTOS = (SELECT NEW.par_pontos + ROUND((NEW.par_lixo/10), 0));
UPDATE utilizador SET Utilizador.uti_pontosTotal = uti_pontosTotal + @PONTOS WHERE uti_id = NEW.par_uti_id;
END IF;
END;
$$
   
-- DEMONSTRAÇÃO DO FUNCIONAMENTO DO TRIGGER trigger_updatePontos:
SELECT * FROM Participa WHERE par_id = 58;	
SELECT uti_pontosTotal, uti_rank FROM Utilizador WHERE uti_id = 16;
UPDATE participa SET par_lixo = 100000 WHERE par_id = 58;