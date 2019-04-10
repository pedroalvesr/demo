package demo.web.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import demo.model.Pessoa;
import demo.repository.PessoaRepository;

@RestController
@RequestMapping("/pessoa")
//@CrossOrigin("${origem}")
public class PessoaRestController {

	@Autowired
	private PessoaRepository pessoaRepository;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Pessoa inserir(@RequestBody Pessoa pessoa) {
		return pessoaRepository.save(pessoa);
	}

	@GetMapping
	public List<Pessoa> listar() {
		List<Pessoa> pessoas = new ArrayList<>();
		pessoaRepository.findAll().forEach(pessoas::add);
		return pessoas;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Pessoa> buscar(@PathVariable Long id) {
		Optional<Pessoa> pessoa = pessoaRepository.findById(id);

		if (pessoa.equals(null)) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(pessoa.get());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Pessoa> atualizar(@PathVariable Long id, @RequestBody Pessoa pessoa) {
		Optional<Pessoa> p = pessoaRepository.findById(id);
		if (!p.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		pessoaRepository.save(pessoa);
		return ResponseEntity.ok(pessoa);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		pessoaRepository.delete(id);
		return ResponseEntity.ok(null);
	}

}
