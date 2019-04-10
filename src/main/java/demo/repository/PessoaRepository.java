package demo.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import demo.model.Pessoa;


public interface PessoaRepository extends CrudRepository<Pessoa, Long> {

	Optional<Pessoa> findById(Long id);

	public Long deleteById(Long id);

}
