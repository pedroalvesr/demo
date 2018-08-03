package demo.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import demo.model.Pessoa;

@RepositoryRestResource(collectionResourceRel = "pessoa", path = "pessoas")
public interface PessoaRepository extends PagingAndSortingRepository<Pessoa, Long>{
   
//   @Query("select p from Pessoa p where p.nome like %?1%")
    Pessoa findById(Long id);
   
}
