package demo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "pessoa")
public class Pessoa {
   
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   private long id;
   
   @Column(name = "nome", nullable = false)
   private String nome;
   
   @Column(name = "nascimento", nullable = false)
   @Temporal(javax.persistence.TemporalType.DATE)
// @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
   private Date nascimento;
   
   public long getId() {
      return id;
   }
   public void setId(long id) {
      this.id = id;
   }
   public String getNome() {
      return nome;
   }
   public void setNome(String nome) {
      this.nome = nome;
   }
   public Date getNascimento() {
      return nascimento;
   }
   public void setNascimento(Date nascimento) {
      this.nascimento = nascimento;
   }
   public String getCpf() {
      return cpf;
   }
   public void setCpf(String cpf) {
      this.cpf = cpf;
   }
   private String cpf;
}
