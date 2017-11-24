CREATE TABLE `demo`.`survey` (
  `uuid` INT NOT NULL AUTO_INCREMENT,
  `run_id` INT NULL,
  `user_id` VARCHAR(45) NULL,
  `question_id` INT NULL,
  `text_response` VARCHAR(200) NULL,
  `numeric_response` INT NULL,
  `question_type` VARCHAR(45) NULL,
  PRIMARY KEY (`uuid`));

