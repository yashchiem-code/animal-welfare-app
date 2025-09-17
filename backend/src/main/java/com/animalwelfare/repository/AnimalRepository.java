package com.animalwelfare.repository;

import com.animalwelfare.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    
    List<Animal> findByStatus(String status);
    
    List<Animal> findByFedToday(boolean fedToday);
    
    @Query("SELECT a FROM Animal a WHERE a.location LIKE %:location%")
    List<Animal> findByLocationContaining(@Param("location") String location);
    
    @Query("SELECT a FROM Animal a WHERE a.name LIKE %:name% OR a.breed LIKE %:breed%")
    List<Animal> findByNameOrBreedContaining(@Param("name") String name, @Param("breed") String breed);
}