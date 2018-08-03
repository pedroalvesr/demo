package demo.web.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import demo.model.Pessoa;
import demo.repository.PessoaRepository;

@RestController
@CrossOrigin("${origem}")
public class PessoaRestController {
   
   @Autowired
   private PessoaRepository pessoaRepository;
   
   @RequestMapping(value = "/pesquisa", method = RequestMethod.GET)
   public List<Pessoa> pessoas() {
       List<Pessoa> target = new ArrayList<>();
       pessoaRepository.findAll().forEach(target::add);
       return target;
   }
   
   @RequestMapping(value="/pesquisa/{id}", method = RequestMethod.GET)
   public Pessoa pessoa(@PathVariable Long id){
      return pessoaRepository.findById(id); 
   }

   @RequestMapping(value = "/salvar", method = RequestMethod.POST)
   public Pessoa salvarPessoa(@RequestBody Pessoa pessoa) {
      return pessoaRepository.save(pessoa);
   }

   @RequestMapping(value = "/apagar/{id}", method = RequestMethod.DELETE)
   public ResponseEntity<Void> apagarPessoa(@PathVariable Long id) {
      pessoaRepository.delete(id);
      return ResponseEntity.ok(null);
   }

}
